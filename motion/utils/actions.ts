"use server"

import db from "@/utils/db"
import { revalidatePath } from "next/cache"

export const getAll = async () => {
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

export const updateStatus = async (id, status) => {
    await db.task.update({
        where: {id},
        data: {
            complete: !status
        }
    })  
    revalidatePath("/dashboard") 
}

export const deleteItem = async (id) => {
    await db.task.delete({
        where: {
            id: id
        }
    })
    revalidatePath("/dashboard")
}