import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, FileText } from "lucide-react"

export default async function ClientDashboard() {
    const session = await getServerSession(authOptions)

    // Fetch my cases
    const cases = await prisma.case.findMany({
        where: { clientId: session?.user.id },
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { proposals: true } } }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meus Casos</h1>
                    <p className="text-gray-500">Gerencie suas consultas jurídicas e revise propostas.</p>
                </div>
                <Link href="/dashboard/client/new-case">
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Novo Caso
                    </Button>
                </Link>
            </div>

            {cases.length === 0 ? (
                <Card className="text-center py-12">
                    <CardContent>
                        <div className="flex justify-center mb-4">
                            <div className="bg-blue-100 p-4 rounded-full">
                                <FileText className="h-8 w-8 text-blue-600" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Você não tem casos publicados</h3>
                        <p className="text-gray-500 mb-6">Publique sua primeira consulta para receber ajuda jurídica.</p>
                        <Link href="/dashboard/client/new-case">
                            <Button>Publicar Agora</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cases.map((c: any) => (
                        <Card key={c.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="truncate">{c.title}</CardTitle>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {c.status === 'OPEN' ? 'Aberto' : c.status}
                                    </span>
                                </div>
                                <CardDescription>{new Date(c.createdAt).toLocaleDateString()}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">{c.description}</p>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">{c._count.proposals} propostas</span>
                                    <Link href={`/cases/${c.id}`}>
                                        <Button variant="outline" size="sm">Ver Detalhes</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
