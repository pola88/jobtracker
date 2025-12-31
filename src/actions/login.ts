import { z } from 'zod';

import { loginSchema } from '@/lib/validators/auth';

type LoginSchema = z.infer<typeof loginSchema>;

export type ActionResponse = {
  success: boolean;
  message: string;
};

export async function loginAction(
  values: LoginSchema,
): Promise<ActionResponse> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      return {
        success: false,
        message: payload?.message ?? 'Error al iniciar sesión',
      };
    }
    return { success: true, message: 'Sesión iniciada correctamente' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Error al iniciar sesión' };
  }
}
