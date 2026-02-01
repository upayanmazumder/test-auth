"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import api from "@/services";

function SessionSync({ children }: { children: ReactNode }) {
	const { data: session } = useSession();
	const setToken = useAuthStore((s) => s.setToken);
	const setEmail = useAuthStore((s) => s.setEmail);

	useEffect(() => {
		let mounted = true;

		const token = (session as { accessToken?: string })?.accessToken;
		if (token) {
			setToken(token);
			return;
		}

		(async () => {
			try {
				const state = useAuthStore.getState();
				const skipUntil = state.skipSyncUntil;
				if (state.skipBackendSync) return;
				if (skipUntil && Date.now() < skipUntil) return;

				const res = await api.get("/auth/me");
				if (!mounted) return;
				const data = res.data as { email?: string };
				if (data?.email) setEmail(data.email);

				setToken("cookie-session");
			} catch {}
		})();

		return () => {
			mounted = false;
		};
	}, [session, setToken, setEmail]);

	return <>{children}</>;
}

export function NextAuthProvider({ children }: { children: ReactNode }) {
	return (
		<SessionProvider>
			<SessionSync>{children}</SessionSync>
		</SessionProvider>
	);
}
