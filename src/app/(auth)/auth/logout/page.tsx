"use client";

import { useEffect } from "react";
import api from "@/services";
import { signOut } from "next-auth/react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
	const logoutStore = useAuthStore((s) => s.logout);
	const router = useRouter();

	useEffect(() => {
		let mounted = true;

		(async () => {
			try {
				await api.post("/auth/logout");
			} catch (e) {
				// ignore backend logout errors
			}

			logoutStore();

			try {
				await signOut({ callbackUrl: "/auth/login" });
			} catch {
				if (mounted) router.push("/auth/login");
			}
		})();

		return () => {
			mounted = false;
		};
	}, [logoutStore, router]);

	return <div>Logging out...</div>;
}
