import { prisma } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface TokenPayload { userId: number}

export async function register(data: {username: string, email: string, password: string}) {
    const exists = await prisma.user.findFirst({
        where: { OR: [{ email: data.email }, { username: data.username }] }
    });
    if(exists) throw new Error("Usuário já existe");

    const hash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
        data: { ...data, password: hash }
    });
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return { user, token };
}

export async function login(data: {email?: string, username?: string, password: string}) {
    const user = await prisma.user.findFirst(
        {
        where: {
            OR:[
                data.email ? { email: data.email } : {},
                data.username ? { username: data.username } : {}
            ]
        }
    }
);
    if(!user) throw new Error("Usuário não encontrado");

    const isValid = await bcrypt.compare(data.password, user.password);
    if(!isValid) throw new Error("Senha incorreta");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    return { user, token };
}