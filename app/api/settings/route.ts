import { prisma } from "@../../../lib/data.fetch";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const settings = await prisma.settings.findFirst();
	return NextResponse.json(settings);
}

export async function POST(request: Request) {
	try {
		const json = await request.json();

		const settings = await prisma.settings.update({
			where: {id:0},
			data: json,
		});

		return new NextResponse(JSON.stringify(settings), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse("User with email already exists", {
				status: 409,
			});
		}
		return new NextResponse(error.message, { status: 500 });
	}
}

export async function PATCH(
	request: Request,
	{ params }: { params: { } }
) {
	const id = 0;
	let json = await request.json();
	console.log("JSON: ", json)

	const updated_settings = await prisma.settings.update({
		where: { id },
		data: json,
	});

	if (!updated_settings) {
		return new NextResponse("No settings with ID found", { status: 404 });
	}

	return NextResponse.json(updated_settings);
}