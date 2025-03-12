import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import prisma from "@/utils/db"
const getEntry = async (id) => {
    const user = await getUserByClerkId()
    // both id and userid has to be unique to use findUnique
    const entry = await prisma.journalEntry.findUnique({
        where: {
            id,
            userId: user.id
        }
    })

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