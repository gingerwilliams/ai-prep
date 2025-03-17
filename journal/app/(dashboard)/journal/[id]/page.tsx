import Editor from "@/components/Editor";
import prisma from "@/utils/db"

import { analyze } from "@/utils/ai";
import { prompt } from "@/utils/prompt";
import { getUserByClerkId } from "@/utils/auth";

const getEntry = async (id) => {
    const user = await getUserByClerkId()
    // both id and userid has to be unique to use findUnique
    const entry = await prisma.journalEntry.findUnique({
        where: {
            id,
            userId: user.id
        },
        include: {
            analysis: true
        }
    })

    await analyze(prompt)

    return entry
}
const EntryPage = async ({ params }) => {
    const p = await params
    const entry = await getEntry(p.id)

    return (
        <div className="h-full w-full">
            <Editor entry={entry}/>
        </div>
    )
}

export default EntryPage