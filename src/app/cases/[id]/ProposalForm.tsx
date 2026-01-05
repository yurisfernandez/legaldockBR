"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProposalForm({ caseId }: { caseId: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [price, setPrice] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch(`/api/cases/${caseId}/proposals`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message,
                    price: price ? parseFloat(price) : null
                }),
            })

            if (!res.ok) throw new Error("Failed")

            router.refresh()
        } catch (error) {
            console.error(error)
            alert("Error enviando propuesta")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Enviar Proposta</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Mensagem / Estratégia</Label>
                        <Textarea
                            placeholder="Olá, sou especialista neste tema. Minha proposta é..."
                            required
                            className="min-h-[100px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Honorários Estimados (Opcional)</Label>
                        <Input
                            type="number"
                            placeholder="Ex: 1500"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar Proposta"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
