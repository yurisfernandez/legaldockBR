"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

function RegisterForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultRole = searchParams.get("role") === "lawyer" ? "LAWYER" : "CLIENT"

    const [role, setRole] = useState<"CLIENT" | "LAWYER">(defaultRole)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || "Erro ao cadastrar")
                setLoading(false)
                return
            }

            // Success - Redirect to login
            router.push("/auth/login?registered=true")
        } catch (err) {
            setError("Ocorreu um erro inesperado")
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
                <CardDescription className="text-center">
                    Junte-se à Advogalia como Cliente ou Advogado
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-gray-100 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setRole("CLIENT")}
                        className={`p-2 rounded-md text-sm font-medium transition-all ${role === "CLIENT" ? "bg-white shadow text-blue-900" : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        Sou Cliente
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("LAWYER")}
                        className={`p-2 rounded-md text-sm font-medium transition-all ${role === "LAWYER" ? "bg-white shadow text-blue-900" : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        Sou Advogado
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder={role === "CLIENT" ? "João Silva" : "Dr. João Silva"}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Criando conta..." : "Cadastrar"}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-gray-500">
                Já tem conta?
                <Link href="/auth/login" className="ml-1 text-blue-600 hover:underline">
                    Entre aqui
                </Link>
            </CardFooter>
        </Card>
    )
}

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="text-center p-4">Carregando...</div>}>
            <RegisterForm />
        </Suspense>
    )
}
