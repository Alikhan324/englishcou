import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="page-shell">
      <section className="mx-auto max-w-md px-6 py-16 md:py-20">
        <div className="card-elevated rounded-[1.35rem] p-8 md:p-10">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground mb-2">
            Register
          </h1>

          <p className="text-muted mb-8 leading-relaxed">
            Жаңа аккаунт ашып, ағылшын үйренуді баста.
          </p>

          <form className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Full name</label>

              <input
                type="text"
                placeholder="Alihan Fazylgaliov"
                className="input-field"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Email</label>

              <input type="email" placeholder="student@gmail.com" className="input-field" />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Password</label>

              <input type="password" placeholder="••••••••" className="input-field" />
            </div>

            <button type="button" className="btn-primary w-full rounded-xl py-3 text-sm">
              Create account
            </button>
          </form>

          <p className="mt-6 text-sm text-muted">
            Аккаунтың бар ма?{" "}
            <Link href="/login" className="font-semibold text-accent transition-colors hover:text-accent-hover">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
