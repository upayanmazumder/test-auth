"use client";

import {
	CircleCheckIcon,
	InfoIcon,
	Loader2Icon,
	OctagonXIcon,
	TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

export const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = "system" } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps["theme"]}
			className="toaster group"
			icons={{
				success: <CircleCheckIcon className="size-4" />,
				info: <InfoIcon className="size-4" />,
				warning: <TriangleAlertIcon className="size-4" />,
				error: <OctagonXIcon className="size-4" />,
				loading: <Loader2Icon className="size-4 animate-spin" />,
			}}
			toastOptions={{
				unstyled: true,
				classNames: {
					toast:
						"group relative flex items-center gap-3 w-full p-4 rounded-2xl overflow-hidden " +
						"bg-white/[0.06] backdrop-blur-md backdrop-saturate-125 " +
						"border border-white/30 " +
						"shadow-[0_4px_16px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.1)_inset] " +
						'before:content-[""] before:absolute before:inset-x-0 before:top-0 before:h-[2px] ' +
						"before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent " +
						'after:content-[""] after:absolute after:inset-x-0 after:bottom-0 after:h-[1px] ' +
						"after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent",
					title: "text-sm font-medium text-white",
					description: "text-sm text-white/70",
					actionButton:
						"px-3 py-1.5 text-xs font-medium rounded-lg " +
						"bg-white/10 hover:bg-white/20 text-white " +
						"border border-white/20 " +
						"transition-colors",
					cancelButton:
						"px-3 py-1.5 text-xs font-medium rounded-lg " +
						"bg-white/5 hover:bg-white/10 text-white/70 " +
						"border border-white/10 " +
						"transition-colors",
					closeButton:
						"absolute right-2 top-2 rounded-lg p-1 " +
						"bg-white/10 hover:bg-white/20 text-white/70 hover:text-white " +
						"border border-white/20 " +
						"transition-colors",
					success: "border-l-2 border-l-green-400/50",
					error: "border-l-2 border-l-red-400/50",
					warning: "border-l-2 border-l-yellow-400/50",
					info: "border-l-2 border-l-blue-400/50",
				},
			}}
			{...props}
		/>
	);
};
