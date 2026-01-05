import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HowItWorksPage() {
    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center mb-12">Como Funciona</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">1. Publicação</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Cliente publica um caso detalhando sua necessidade jurídica, local e categoria. É totalmente gratuito.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">2. Propostas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            Advogados registrados recebem notificações de casos em sua área de atuação e enviam propostas iniciais.
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">3. Conexão</CardTitle>
                        </CardHeader>
                        <CardContent>
                            O cliente revisa as propostas e entra em contato com o advogado que melhor se adapta às suas necessidades.
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">Pronto para começar?</h2>
                    <div className="flex justify-center gap-4">
                        <Button asChild><Link href="/auth/register?role=client">Publicar Caso</Link></Button>
                        <Button variant="outline" asChild><Link href="/auth/register?role=lawyer">Sou Advogado</Link></Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
