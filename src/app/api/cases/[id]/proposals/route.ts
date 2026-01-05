import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const proposalSchema = z.object({
    message: z.string().min(10),
    price: z.number().nullable().optional(),
})

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'LAWYER') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const body = await req.json()
        const { message, price } = proposalSchema.parse(body)

        // Check if duplicate
        const existing = await prisma.proposal.findFirst({
            where: {
                caseId: id,
                lawyerId: session.user.id
            }
        })

        if (existing) {
            return NextResponse.json({ message: "Already applied" }, { status: 400 })
        }

        const proposal = await prisma.proposal.create({
            data: {
                message,
                price,
                caseId: id,
                lawyerId: session.user.id
            }
        })

        return NextResponse.json(proposal, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 })
    }
}
