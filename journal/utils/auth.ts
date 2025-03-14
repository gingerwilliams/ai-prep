import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const getUserByClerkId = async () => {
    const { userId } = await auth()

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId,
      },
    })
  
    return user
}

export const syncNewUser = async () => {
    const user = await currentUser()
    const match = await prisma.user.findUnique({
        where: {
            clerkId: user.id,
        }
    })
    if (!match) {
        // this is a brand new user
        await prisma.user.create({
            data: {
                clerkId: user.id,
                email: user.emailAddresses[0].emailAddress,
            }
        })
    } 
    
    redirect("/sign-in")
}