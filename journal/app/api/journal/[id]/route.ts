import { getUserByClerkId } from "@/utils/auth"
import prisma from "@/utils/db"
import { NextResponse } from "next/server"


export const PATCH = async (request, { params }) => {
    const { content } = await request.json()
    const user = await getUserByClerkId()
    const p = await params
    const updatedEntry = await prisma.journalEntry.update({
        where: {
            userId_id: {
                userId: user.id,
                id: p.id
            }
        },
        data: {
            content
        }
    })

    return NextResponse.json({ data: updatedEntry })
}