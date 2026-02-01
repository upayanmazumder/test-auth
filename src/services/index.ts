import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
	withCredentials: true,
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
}

// Add a request interceptor
api.interceptors.request.use(
	(config: CustomAxiosRequestConfig) => {
		config.withCredentials = true;
		return config;
	},
	(error: AxiosError) => Promise.reject(error),
);

// Add a response interceptor
api.interceptors.response.use(
	(response) => response,
	async (err) => {
		const error = err as AxiosError;
		const originalRequest = error.config as CustomAxiosRequestConfig;
		// Don't try to refresh for auth endpoints to avoid loops
		const reqUrl = String(originalRequest?.url || "");
		if (
			reqUrl.includes("/auth/refresh") ||
			reqUrl.includes("/auth/login") ||
			reqUrl.includes("/auth/me")
		) {
			return Promise.reject(error);
		}

		if (error.response?.status === 401 && !originalRequest?._retry) {
			originalRequest._retry = true;

			try {
				const base =
					(api.defaults.baseURL as string) ||
					process.env.NEXT_PUBLIC_API_BASEURL ||
					"";
				const refreshUrl = `${base.replace(/\/$/, "")}/auth/refresh`;
				// Use the plain axios instance so interceptors on `api` don't run for the refresh call
				await axios.post(refreshUrl, {}, { withCredentials: true });

				return api(originalRequest);
			} catch {
				// Let callers decide how to handle an expired session. Show a toast but don't force a redirect here.
				try {
					toast.error("Session expired. Please login again.");
				} catch {}
				// annotate the error so callers can check for this case
				(error as any).code = "AUTH_REFRESH_FAILED";
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	},
);

export default api;
