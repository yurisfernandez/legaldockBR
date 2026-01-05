import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/components/layout/LogoutButton"

export async function Navbar() {
    const session = await getServerSession(authOptions)

    return (
        <nav className="border-b bg-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-900">
                    Advogalia
                </Link>

                {/* Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-blue-900">
                        Como funciona?
                    </Link>
                    <Link href="/lawyers" className="text-sm font-medium text-gray-700 hover:text-blue-900">
                        Para Advogados
                    </Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                    {session ? (
                        <div className="flex items-center gap-4">
                            <Link href={session.user.role === 'LAWYER' ? '/dashboard/lawyer' : '/dashboard/client'}>
                                <Button variant="outline">Ir para o Painel</Button>
                            </Link>
                            <LogoutButton />
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="ghost">Entrar</Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button>Cadastrar</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
