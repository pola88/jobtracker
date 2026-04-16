import { ActionResponseBase } from '@/lib/types';
import { RegisterSchemaDTO, registerSchema } from '@/lib/validators/auth';

export async function registerAction(
  values: RegisterSchemaDTO,
): Promise<ActionResponseBase> {
  try {
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      return { success: false, message: 'Invalid fields' };
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      credentials: 'include',
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => null);
      return {
        success: false,
        message: payload?.message,
      };
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Unknown error' };
  }
}
