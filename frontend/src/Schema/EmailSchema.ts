import { z } from "zod";

export const emailSchema = z.object({
    email: z
        .string()
        .min(1, "El email es obligatorio")
        .email("Formato de email inválido"),
});

export type EmailFormData = z.infer<typeof emailSchema>;