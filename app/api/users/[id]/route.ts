import db from "@lib/db";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { id: number } }
) {
	const id = params.id;
	const user = await db.user.findUnique({
		where: {
			id,
		},
	});

	if (!user) {
		return new NextResponse("No user with ID found", { status: 404 });
	}

	return NextResponse.json(user);
}

export async function PATCH(
	request: Request,
	{ params }: { params: { id: number } }
) {
	const id = params.id;
	let json = await request.json();

	const updated_user = await db.user.update({
		where: { id },
		data: json,
	});

	if (!updated_user) {
		return new NextResponse("No user with ID found", { status: 404 });
	}

	return NextResponse.json(updated_user);
}

export async function DELETE(
	request: Request,
	{ params }: { params: { id: number } }
) {
	try {
		const id = params.id;
		await db.user.delete({
			where: { id },
		});

		return new NextResponse(null, { status: 204 });
	} catch (error: any) {
		if (error.code === "P2025") {
			return new NextResponse("No user with ID found", { status: 404 });
		}

		return new NextResponse(error.message, { status: 500 });
	}
}
