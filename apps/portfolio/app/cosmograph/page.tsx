import { getAllNodes } from '@/lib/content/parser';
import { CosmographClient } from './CosmographClient';

/**
 * Cosmograph Page
 *
 * Entry point for exploring Shalom's digital ecosystem.
 * Currently showing navigation fallback (graph-off mode).
 * Will be enhanced with Cosmograph visualization in next phase.
 */

export const metadata = {
  title: "Explore Shalom's Cosmograph",
  description:
    "Navigate through Shalom's interconnected digital ecosystem - work, creative experiments, philosophy, and more.",
};

export default function CosmographPage() {
  // Get all content nodes (server-side)
  const nodes = getAllNodes();

  return <CosmographClient nodes={nodes} />;
}
