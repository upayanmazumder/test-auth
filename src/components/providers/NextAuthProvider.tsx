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

		// If no NextAuth session, try to sync from backend cookie session.
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
				// mark as verified in store so app routes don't force-login.
				setToken("cookie-session");
			} catch {
				// ignore - no backend session
			}
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
