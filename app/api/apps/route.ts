import db from "@lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const apps = await db.app.findMany();
	return NextResponse.json(apps);
}

export async function POST(request: Request) {
	try {
		const json = await request.json();

		const app = await db.app.create({
			data: json,
		});

		return new NextResponse(JSON.stringify(app), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: any) {
		if (error.code === "P2002") {
			return new NextResponse("App with email already exists", {
				status: 409,
			});
		}
		return new NextResponse(error.message, { status: 500 });
	}
}
