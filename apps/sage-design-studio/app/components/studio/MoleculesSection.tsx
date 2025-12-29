'use client';

export function MoleculesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Molecules
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Functional Bonding:</strong> Simple groups of atoms bonded together to perform a single, specific task. Often highly reusable and context-agnostic.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Self-contained units with singular purpose, like search bars and form fields.
        </p>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-16">
        <p className="text-xl text-[var(--color-text-secondary)]">
          Molecules coming soon...
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          Examples: Search Bar, Form Field, Card with Actions
        </p>
      </div>
    </div>
  );
}
