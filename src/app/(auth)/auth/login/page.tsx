"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services";

export default function LoginPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return;
		if (session) router.replace("/dashboard/round0");
	}, [session, status, router]);

	// Try to sync session from backend cookies (after OAuth redirect)
	useEffect(() => {
		(async () => {
			try {
				await api.get("/auth/me");
				router.replace("/dashboard/round0");
			} catch (e) {
				// ignore - no session available
			}
		})();
	}, [router]);

	return (
		<div
			className="min-h-screen bg-cover bg-center bg-no-repeat relative"
			style={{ backgroundImage: "url('/bgf.png')" }}
		>
			<div className="min-h-screen flex items-center justify-center p-6">
				<div className="w-full max-w-md bg-[rgba(10,10,20,0.06)] rounded-2xl p-8 shadow-recess backdrop-blur-xl">
					<div className="flex flex-col items-center gap-4">
						<div className="relative w-28 h-28">
							<Image
								src="/icon.svg"
								alt="Devsoc"
								fill
								className="object-contain"
							/>
						</div>

						<h1 className="text-3xl font-semibold text-white">
							DevSOC&apos;26
						</h1>

						<p className="text-sm text-white/70">
							Sign in using Google to continue
						</p>

						<Button
							className="mt-2 w-50%"
							onClick={() => {
								const apiUrl =
									process.env.NEXT_PUBLIC_API_BASEURL ||
									process.env.NEXT_PUBLIC_API_URL ||
									"http://localhost:8080";
								window.location.href = `${apiUrl}/auth/google`;
							}}
						>
							Sign in with Google
						</Button>
					</div>
					<div className="absolute -bottom-8 -right-8 w-30 h-30">
						<Image
							src="/mascot/happy_smile.png"
							alt="mascot"
							fill
							className="object-contain"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
