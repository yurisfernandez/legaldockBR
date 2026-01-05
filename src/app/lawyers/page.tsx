import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const PLANS = [
    {
        name: "Inicial",
        price: "Gratuito",
        description: "Para advogados que estão começando.",
        features: ["Acesso limitado a casos", "Perfil Básico", "1 Proposta por semana"],
        cta: "Começar Grátis",
        href: "/auth/register?role=lawyer"
    },
    {
        name: "Profissional",
        price: "R$ 99/mês",
        description: "Para crescer sua carteira de clientes.",
        features: ["Acesso ilimitado a casos", "Perfil Destacado", "Propostas ilimitadas", "Selo de Verificado"],
        cta: "Assinar Agora",
        href: "/auth/register?role=lawyer",
        popular: true
    },
    {
        name: "Bufê / Escritório",
        price: "R$ 249/mês",
        description: "Para escritórios com múltiplos advogados.",
        features: ["Tudo do Profissional", "Gestão de equipe", "Suporte Prioritário", "API de Integração"],
        cta: "Falar com Vendas",
        href: "#"
    }
]

export default function LawyersPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="bg-blue-900 text-white py-20 px-4">
                <div className="container mx-auto text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">Acelere o crescimento do seu escritório</h1>
                    <p className="text-xl text-blue-100 mb-8">
                        Milhares de pessoas buscam advogados na Advogalia todos os meses. Esteja onde seus clientes estão.
                    </p>
                    <Button size="lg" variant="secondary" className="px-8 text-lg" asChild>
                        <Link href="/auth/register?role=lawyer">Começar Agora</Link>
                    </Button>
                </div>
            </section>

            {/* Pricing */}
            <section className="py-20 px-4">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-12">Planos Flexíveis</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {PLANS.map(plan => (
                            <Card key={plan.name} className={`relative flex flex-col ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                                {plan.popular && <div className="absolute top-0 right-0 left-0 -mt-3 text-center"><span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">Mais Popular</span></div>}
                                <CardHeader>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="text-3xl font-bold mb-6">{plan.price}</div>
                                    <ul className="space-y-3 pb-6">
                                        {plan.features.map(f => (
                                            <li key={f} className="flex items-center text-sm text-gray-600">
                                                <Check className="h-4 w-4 mr-2 text-green-500" /> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                                        <Link href={plan.href}>{plan.cta}</Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
