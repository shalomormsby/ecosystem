'use client';

export function TemplatesSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2 text-[var(--color-text-primary)]">
          Templates
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] mb-2">
          <strong>Content Structure:</strong> Layouts that define how organisms and components fit together without specific content. They act as the "blueprint" or wireframe for a page.
        </p>
        <p className="text-base text-[var(--color-text-muted)]">
          Page-level layouts and structural blueprints for consistent experiences.
        </p>
      </div>

      {/* Coming Soon */}
      <div className="text-center py-16">
        <p className="text-xl text-[var(--color-text-secondary)]">
          Templates coming soon...
        </p>
        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          Examples: Homepage Layout, Dashboard Skeleton, Product Detail Layout
        </p>
      </div>
    </div>
  );
}
