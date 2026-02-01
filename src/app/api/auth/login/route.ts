import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const { email } = await req.json();

	if (email.includes("@vitstudent.ac.in")) {
		return NextResponse.json({
			success: true,
			message: "OTP sent successfully",
			email,
		});
	}

	return NextResponse.json(
		{
			success: false,
			message: "Invalid credentials",
		},
		{ status: 401 },
	);
}
