import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/auth/login")
    }

    const role = session.user.role

    if (role === "CLIENT") {
        redirect("/dashboard/client")
    } else if (role === "LAWYER") {
        redirect("/dashboard/lawyer")
    } else if (role === "ADMIN") {
        redirect("/dashboard/admin")
    } else {
        redirect("/")
    }
}
