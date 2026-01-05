const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const clients = users.filter(u => u.role === 'CLIENT');
    const lawyers = users.filter(u => u.role === 'LAWYER');
    const admins = users.filter(u => u.role === 'ADMIN');
    const others = users.filter(u => !['CLIENT', 'LAWYER', 'ADMIN'].includes(u.role));

    console.log('\n--- RESUMEN DE USUARIOS ---\n');

    console.log(`Total: ${users.length}`);
    console.log(`Clientes: ${clients.length}`);
    console.log(`Abogados: ${lawyers.length}`);
    if (admins.length > 0) console.log(`Admins: ${admins.length}`);
    console.log('\n---------------------------\n');

    if (clients.length > 0) {
        console.log('--- CLIENTES ---');
        clients.forEach(u => console.log(`- [${u.id}] ${u.name || 'Sin Nombre'} (${u.email})`));
        console.log('');
    }

    if (lawyers.length > 0) {
        console.log('--- ABOGADOS ---');
        lawyers.forEach(u => console.log(`- [${u.id}] ${u.name || 'Sin Nombre'} (${u.email})`));
        console.log('');
    }

    if (admins.length > 0) {
        console.log('--- ADMINS ---');
        admins.forEach(u => console.log(`- [${u.id}] ${u.name || 'Sin Nombre'} (${u.email})`));
        console.log('');
    }

    if (others.length > 0) {
        console.log('--- OTROS ---');
        others.forEach(u => console.log(`- [${u.id}] ${u.name || 'Sin Nombre'} (${u.email}) - Role: ${u.role}`));
        console.log('');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
