import Link from "next/link";

import { auth } from '@clerk/nextjs/server'

export default async function Home() {
  const { userId } = await auth()
  console.log(userId)
  // if (!userId) return redirectToSignIn()
  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Journal</h1>
        <p className="text-2xl text-white/60 mb-4">This is the mood tracking app</p>
        <div>
          <Link href={href}>
          <button className="bg-blue-600 px-4 py-2 rounded-lg text-xlg">get started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
