"use client"

import { SessionProvider } from "next-auth/react"


interface Authcontextprops{
    children: React.ReactNode
}

export default function Authcontext({children}:Authcontextprops){
    return <SessionProvider>{children}</SessionProvider>
}