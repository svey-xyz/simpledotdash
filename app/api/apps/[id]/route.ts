import db from "@lib/db";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { id: number } }
) {
	const id = params.id;
	const app = await db.app.findUnique({
		where: {
			id,
		},
	});

	if (!app) {
		return new NextResponse("No app with ID found", { status: 404 });
	}

	return NextResponse.json(app);
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: number } }
) {
	const id = params.id;
	let json = await request.json();

	const updated_app = await db.app.update({
		where: { id },
		data: json,
	});

	if (!updated_app) {
		return new NextResponse("No app with ID found", { status: 404 });
	}

	return NextResponse.json(updated_app);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: number } }
) {
	try {
		const id = params.id;
		await db.app.delete({
			where: { id },
		});

		return new NextResponse(null, { status: 204 });
	} catch (error: any) {
		if (error.code === "P2025") {
			return new NextResponse("No app with ID found", { status: 404 });
		}

		return new NextResponse(error.message, { status: 500 });
	}
}
