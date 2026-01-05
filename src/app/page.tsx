import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Scale, ShieldCheck, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20 px-4">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-blue-950 mb-6 tracking-tight">
              Encontre o advogado ideal <br className="hidden md:block" /> para o seu caso.
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Publique sua consulta jurídica gratuitamente e receba propostas de advogados verificados em minutos.
              Sem intermediários, você escolhe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register?role=client">
                <Button size="lg" className="h-12 px-8 text-lg w-full sm:w-auto">
                  Publicar meu Caso Grátis <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/register?role=lawyer">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg w-full sm:w-auto">
                  Sou Advogado
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features / How it works */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Como funciona a Advogalia?</h2>
              <p className="text-lg text-gray-600">Sua solução jurídica em três passos simples</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                  <Scale className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. Publique seu caso</h3>
                <p className="text-gray-600">
                  Conte brevemente o que você precisa. É 100% confidencial e gratuito.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. Receba propostas</h3>
                <p className="text-gray-600">
                  Advogados especializados revisam seu caso e enviam honorários e estratégias.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 border hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                  <ShieldCheck className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. Escolha o melhor</h3>
                <p className="text-gray-600">
                  Compare perfis, avaliações e preços. Contate diretamente o profissional que preferir.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA for Lawyers */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Você é Advogado? Potencialize seu escritório.</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Acesse centenas de clientes potenciais todos os meses. Gerencie seus casos e construa sua reputação online.
            </p>
            <Link href="/auth/register?role=lawyer">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-lg">
                Entrar como Profissional
              </Button>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
