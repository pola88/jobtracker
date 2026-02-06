import { ActionResponseBase } from '@/lib/types';
import { loginSchema } from '@/lib/validators/auth';

export async function loginAction(
  values: FormData,
): Promise<ActionResponseBase> {
  try {
    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      return { success: false, message: 'Invalid fields' };
    }

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: parsed.data.email,
        password: parsed.data.password,
      }),
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
