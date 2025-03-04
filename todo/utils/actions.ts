"use server"
import { revalidatePath } from "next/cache";

import db from "./db";

export const completeTodo = async (id) => {
    await db.todo.update({
        where: { id },
        data: { complete: true }
    })
    revalidatePath("/todos")
}

export const newTodo = async (formData) => {
    await db.todo.create({
        data: {
            content: formData.get("content"), // see prisma model
        }
    })

    // to load data on screen after request is successful
    // soft refresh, this expires the cache and forces an update for this path
    revalidatePath("/todos")
}