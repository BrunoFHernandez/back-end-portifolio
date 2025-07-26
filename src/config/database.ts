import { PrismaClient } from "../generated/prisma";  
export const prisma = new PrismaClient();

export async function connectToDatabase() {
    try {
        await prisma.$connect();
        console.log("Banco de dados conectado corretamente.");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
}