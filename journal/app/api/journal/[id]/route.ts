import { analyze } from "@/utils/ai"
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

    const newAnalysis = await analyze(updatedEntry.content)
    const analysis = await prisma.analysis.update({
        where: {
            entryId: updatedEntry.id
        },
        data: {
            ...newAnalysis
        }
    })

    return NextResponse.json({ data: {...updatedEntry, analysis} })
}