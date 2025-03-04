// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // specific routs you want the middleware to run and what functionality
    // this will redirect all pages to the home page
    // return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
    // if you dont want the middleware to run on every route
    // matcher: ["/todos"],
}