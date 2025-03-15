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
        }
    })

    await analyze(prompt)

    return entry
}
const EntryPage = async ({ params }) => {
    const p = await params
    const entry = await getEntry(p.id)
    const analysisData = [
        {name: "Summary", value: ""},
        {name: "Subject", value: ""},
        {name: "Mood", value: ""},
        {name: "Positive", value: "true"}
    ]
    return (
        <div className="h-full w-full grid grid-cols-3">
            <div className="col-span-2">
                <Editor entry={entry}/>
            </div>
            <div className="border-l border-black/10" >
                <div className="bg-blue-300 px-6 py-10">
                    <h2 className="text-2xl">Analysis</h2>
                </div>
                <div>
                        <ul>
                            {
                                analysisData.map(item => (
                                    <li
                                        className="px-2 py-4 flex items-center justify-between border-b border-t border-black/10"
                                        key={item.name}
                                    >
                                        <span className="text-lg font-semibold">{ item.name }</span>
                                        <span>{ item.value }</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default EntryPage