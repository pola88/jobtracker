import Link from "next/link";

import { RegisterForm } from "@/components/forms/register-form";

export default function RegisterPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary-foreground/70">
            JobTrack
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Centraliza tus entrevistas, identifica cuellos de botella y gana foco.
          </h1>
        </div>
        <p className="text-sm text-primary-foreground/80">
          Diseñada con las mejores prácticas de Vercel para ofrecerte velocidad y seguridad.
        </p>
      </section>
      <section className="flex flex-col justify-center px-8 py-16 sm:px-16">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-semibold">Crea tu cuenta</h2>
            <p className="text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
          <RegisterForm />
        </div>
      </section>
    </div>
  );
}

