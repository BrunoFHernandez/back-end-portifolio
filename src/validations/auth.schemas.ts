import { email, z , ZodError} from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres."),
    email: z.email("O e-mail deve ser válido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export const loginSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.email().optional(),
    password: z.string().min(6),
}).refine(data => data.email || data.username, {
    message: "Voce deve fornecer um e-mail ou nome de usuário.",
});
