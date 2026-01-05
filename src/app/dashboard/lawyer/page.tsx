import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, ArrowRight } from "lucide-react"

export default async function LawyerDashboard() {
    const session = await getServerSession(authOptions)

    if (session?.user.role !== 'LAWYER') {
        return <div>Access Denied</div>
    }

    // Fetch all open cases
    // In a real app we might want pagination and filters in the URL or client side
    const cases = await prisma.case.findMany({
        where: { status: 'OPEN' },
        orderBy: { createdAt: 'desc' },
        include: {
            client: { select: { name: true } },
            _count: { select: { proposals: true } }
        }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Oportunidades Jurídicas</h1>
                    <p className="text-gray-500">Encontre casos que coincidam com sua especialidade.</p>
                </div>
                <div className="flex gap-2">
                    {/* Mock Filters */}
                    <Button variant="outline">Filtrar por Região</Button>
                    <Button variant="outline">Filtrar por Categoria</Button>
                </div>
            </div>

            <div className="grid gap-6">
                {cases.length === 0 ? (
                    <div className="text-center py-10">Não há casos abertos no momento.</div>
                ) : cases.map((c: any) => (
                    <Card key={c.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary">{c.category || 'Geral'}</Badge>
                                        <span className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar className="h-3 w-3" /> {new Date(c.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <CardTitle className="text-xl text-blue-900">
                                        <Link href={`/cases/${c.id}`} className="hover:underline">
                                            {c.title}
                                        </Link>
                                    </CardTitle>
                                </div>
                                <Button asChild size="sm">
                                    <Link href={`/cases/${c.id}`}>Ver Caso <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 line-clamp-2">{c.description}</p>
                        </CardContent>
                        <CardFooter className="bg-gray-50/50 py-3 flex justify-between items-center text-sm">
                            <div className="flex items-center gap-4 text-gray-500">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> {c.location || 'Brasil'}
                                </div>
                            </div>
                            <div className="text-gray-500">
                                {c._count.proposals} propostas recebidas
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
