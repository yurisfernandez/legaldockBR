import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProposalForm } from "./ProposalForm" // Client component
import { Navbar } from "@/components/layout/Navbar"

export default async function CaseDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await getServerSession(authOptions)
    if (!session) redirect("/auth/login")

    const caseData = await prisma.case.findUnique({
        where: { id },
        include: {
            client: { select: { name: true, email: true } },
            proposals: {
                include: { lawyer: { select: { name: true, lawyerProfile: true } } }
            }
        }
    })

    if (!caseData) notFound()

    const isClient = session.user.role === 'CLIENT'
    const isOwner = isClient && caseData.clientId === session.user.id
    const isLawyer = session.user.role === 'LAWYER'

    // If lawyer, check if already proposed
    const myProposal = isLawyer ? caseData.proposals.find((p: any) => p.lawyerId === session.user.id) : null

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <Navbar />
            <div className="container mx-auto px-4 py-8 max-w-4xl">

                {/* Case Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge>{caseData.category}</Badge>
                        <span className={`text-sm font-medium px-2 py-0.5 rounded ${caseData.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-gray-200'
                            }`}>
                            {caseData.status === 'OPEN' ? 'Aberto' : caseData.status}
                        </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{caseData.title}</h1>
                    <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                        <h3 className="font-semibold text-lg">Descrição do Caso</h3>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{caseData.description}</p>
                        <div className="pt-4 border-t flex gap-6 text-sm text-gray-500">
                            <span>📍 {caseData.location}</span>
                            <span>📅 {new Date(caseData.createdAt).toLocaleDateString()}</span>
                            {isLawyer && <span>👤 Cliente: {caseData.client.name}</span>}
                        </div>
                    </div>
                </div>

                {/* Client View: Proposals List */}
                {isOwner && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Propostas Recebidas ({caseData.proposals.length})</h2>
                        {caseData.proposals.length === 0 ? (
                            <p className="text-gray-500">Você ainda não recebeu propostas.</p>
                        ) : (
                            caseData.proposals.map((p: any) => (
                                <Card key={p.id}>
                                    <CardHeader>
                                        <div className="flex justify-between">
                                            <div className="font-semibold text-lg">{p.lawyer.name}</div>
                                            <div className="text-green-700 font-bold">
                                                {p.price ? `R$ ${p.price.toLocaleString()}` : 'A combinar'}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-600 mb-4">{p.message}</p>
                                        <Button size="sm">Contatar / Aceitar</Button>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                )}

                {/* Lawyer View: Proposal Form or Status */}
                {isLawyer && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Sua Proposta</h2>
                        {myProposal ? (
                            <Card className="bg-blue-50 border-blue-200">
                                <CardHeader>
                                    <CardTitle className="text-blue-900">Proposta Enviada</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="mb-2"><strong>Mensagem:</strong> {myProposal.message}</p>
                                    <p><strong>Honorários:</strong> {myProposal.price ? `R$ ${myProposal.price}` : 'A combinar'}</p>
                                    <Badge className="mt-4">Status: {myProposal.status}</Badge>
                                </CardContent>
                            </Card>
                        ) : (
                            <ProposalForm caseId={caseData.id} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
