export function Footer() {
    return (
        <footer className="bg-gray-50 border-t py-12">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-lg mb-4 text-blue-900">Advogalia</h3>
                    <p className="text-sm text-gray-600">
                        Conectando pessoas a soluções jurídicas confiáveis no Brasil.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Plataforma</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><a href="#" className="hover:text-blue-900">Buscar Advogado</a></li>
                        <li><a href="#" className="hover:text-blue-900">Publicar Caso</a></li>
                        <li><a href="#" className="hover:text-blue-900">Planos para Advogados</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Suporte</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><a href="#" className="hover:text-blue-900">Central de Ajuda</a></li>
                        <li><a href="#" className="hover:text-blue-900">Termos e Condições</a></li>
                        <li><a href="#" className="hover:text-blue-900">Privacidade</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Contato</h4>
                    <p className="text-sm text-gray-600 mb-2">contato@advogalia.com.br</p>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Advogalia. Todos os direitos reservados.
            </div>
        </footer>
    )
}
