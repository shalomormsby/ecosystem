'use client';

import { useEffect } from 'react';

interface JsonLdMetadataProps {
  data: Record<string, any>;
}

/**
 * Embeds JSON-LD structured data in the page for LLM and search engine optimization
 * Dynamically updates when component changes to reflect current documentation
 */
export function JsonLdMetadata({ data }: JsonLdMetadataProps) {
  useEffect(() => {
    // Remove any existing script with this ID
    const existingScript = document.getElementById('component-metadata');
    if (existingScript) {
      existingScript.remove();
    }

    // Create new script tag with updated metadata
    const script = document.createElement('script');
    script.id = 'component-metadata';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      const scriptToRemove = document.getElementById('component-metadata');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null; // This component doesn't render anything visible
}
