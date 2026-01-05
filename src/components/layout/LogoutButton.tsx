"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
    return (
        <Button
            variant="ghost"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
        </Button>
    )
}
