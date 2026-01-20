'use client';

import { useEffect } from 'react';
import { Button } from '@sage/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)] px-4">
      <div className="max-w-md w-full py-12 text-center">
        <div className="space-y-6">
          {/* Error Icon - 404 Text */}
          <div className="flex justify-center select-none">
            <h1
              className="text-[12rem] leading-none font-black text-transparent"
              style={{
                WebkitTextStroke: '4px var(--color-error)'
              }}
            >
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="space-y-2 -mt-8 relative z-10">
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)]">
              Sorry, my bad.
            </h2>
            <p className="text-[var(--color-text-secondary)]">
              An unexpected error occurred while loading this page. Please try again.
            </p>
            {error.message && (
              <details className="mt-4 text-left">
                <summary className="text-sm text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text-secondary)]">
                  Technical details
                </summary>
                <pre className="mt-2 p-3 bg-[var(--color-surface)] rounded text-xs overflow-x-auto text-[var(--color-text-secondary)] border border-[var(--color-border)]">
                  {error.message}
                </pre>
              </details>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
            <Button variant="default" size="lg" onClick={reset}>
              Try Again
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                // Force a hard reload to the root to clear any stuck states
                window.location.href = window.location.origin;
              }}
            >
              Go to Homepage
            </Button>
          </div>

          {/* Help Text */}
          <p className="text-sm text-[var(--color-text-muted)] pt-4">
            If this problem persists, please{' '}
            <a
              href="https://github.com/shalom-ormsby/ecosystem/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--color-primary)] hover:underline"
            >
              report an issue
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
