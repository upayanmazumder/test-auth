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

		/*     if (error.response?.status === 417) {
      if (error.config?.url === '/info/me') {
        const responseData = error.response?.data as {
          data: { is_verified: boolean; is_starred: boolean };
        };

        if (responseData.data.is_verified === false) {
          window.location.href = '/auth/login';
        }
        if (responseData.data.is_starred === false) {
          window.location.href = '/auth/login';
        }
      }
    } */

		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const base =
					(api.defaults.baseURL as string) ||
					process.env.NEXT_PUBLIC_API_BASEURL ||
					"";
				const refreshUrl = `${base.replace(/\/$/, "")}/auth/refresh`;
				await axios.post(
					refreshUrl,
					{},
					{
						withCredentials: true,
					},
				);

				return api(originalRequest);
			} catch {
				toast.error("Session expired. Please login again.");
				setTimeout(() => {
					window.location.href = "/auth/login";
				}, 2000);
			}
		}

		return Promise.reject(error);
	},
);

export default api;
