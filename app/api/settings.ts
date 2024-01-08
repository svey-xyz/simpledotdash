import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function update(data: typeof prisma.settings.fields) {

	const settings = await prisma.settings.update({
		where: {id: 0},
		data: {title:data.title.name}
	})
}