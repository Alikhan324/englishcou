export default function PricingPage() {
  return (
    <main className="page-shell">
      <section className="mx-auto max-w-5xl px-6 py-16 md:py-20">
        <div className="mb-12 text-center">
          <p className="font-display mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            Premium
          </p>

          <h1 className="font-display mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl mb-4">
            Unlock all English lessons
          </h1>

          <p className="mx-auto max-w-xl text-muted text-lg leading-relaxed">
            Premium access арқылы барлық сабақтарды, тесттерді және материалдарды аша аласың.
          </p>
        </div>

        <div className="card-elevated mx-auto max-w-md rounded-3xl p-8 md:p-10">
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Premium Plan</h2>

          <p className="text-muted mb-6 leading-relaxed">Барлық курстарға толық доступ.</p>

          <div className="mb-6 font-display text-4xl font-semibold tracking-tight text-foreground">
            1990 ₸
            <span className="text-base font-normal text-muted"> / month</span>
          </div>

          <ul className="mb-8 space-y-3 text-foreground/90">
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              Барлық premium сабақтар
            </li>
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              Quiz және practice тапсырмалар
            </li>
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              PDF / slides материалдар
            </li>
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              Course progress
            </li>
            <li className="flex gap-2">
              <span className="text-accent" aria-hidden>
                ✓
              </span>
              Certificate
            </li>
          </ul>

          <button type="button" className="btn-primary w-full rounded-xl py-3 text-sm">
            Buy Premium
          </button>

          <p className="mt-4 text-center text-sm text-muted">
            Қазір бұл тек demo. Кейін Kaspi/Stripe төлем қосамыз.
          </p>
        </div>
      </section>
    </main>
  );
}
