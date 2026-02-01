import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type GlassTextAreaProps = ComponentPropsWithoutRef<"textarea">;

export const Textarea = ({
	rows = 6,
	className,
	...props
}: GlassTextAreaProps) => {
	return (
		<textarea
			{...props}
			rows={rows}
			className={cn(
				"shadow-recess mt-2 w-full rounded-2xl px-5 py-4 resize-none text-sm text-white placeholder-white/60 backdrop-blur-3xl!  outline-none ring-1 ring-white/10",
				className,
			)}
		/>
	);
};
