"use server"

import db from "@/utils/db"
import { revalidatePath } from "next/cache"

export const read = async () => {
    return await db.task.findMany({})
}

export const create = async (formData) => {
    await db.task.create({
        data: {
            title: formData.get("title"),
            content: formData.get("content")
        }
    })
    revalidatePath("/dashboard")
}