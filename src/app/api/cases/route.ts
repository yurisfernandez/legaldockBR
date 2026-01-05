import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const caseSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(20),
    category: z.string(),
    location: z.string(),
})

export async function POST(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'CLIENT') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    try {
        const body = await req.json()
        const { title, description, category, location } = caseSchema.parse(body)

        const newCase = await prisma.case.create({
            data: {
                title,
                description,
                category,
                location,
                clientId: session.user.id,
            }
        })

        return NextResponse.json(newCase, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error Creating Case" }, { status: 500 })
    }
}

export async function GET(req: Request) {
    // Basic GET to list cases for Lawyers
    // Should filter by status OPEN
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')

    const whereClause: any = { status: 'OPEN' }
    if (category && category !== 'all') {
        whereClause.category = category
    }

    const cases = await prisma.case.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        include: {
            client: {
                select: { name: true }
            }
        }
    })

    return NextResponse.json(cases)
}
