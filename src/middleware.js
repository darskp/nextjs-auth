import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export function middleware(request) {

    const cookie = cookies();
    const path = request.nextUrl.pathname;
    const publicPath = path == "/sign-in" || path === "/sign-up"
    const getTokenValue = cookie.get('token')?.value;
    if (!publicPath && getTokenValue == "") {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
    if (publicPath && getTokenValue) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/sign-in', '/sign-up']
}