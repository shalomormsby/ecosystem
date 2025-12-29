import { SecondaryNav, type SecondaryNavItem } from '@ecosystem/design-system';

type Section = 'overview' | 'tokens' | 'atoms' | 'molecules' | 'organisms' | 'templates';

interface SectionNavProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const sections: SecondaryNavItem[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'atoms', label: 'Atoms' },
  { id: 'molecules', label: 'Molecules' },
  { id: 'organisms', label: 'Organisms' },
  { id: 'templates', label: 'Templates' },
];

export function SectionNav({ activeSection, onSectionChange }: SectionNavProps) {
  return (
    <SecondaryNav
      items={sections}
      activeId={activeSection}
      onItemChange={(id) => onSectionChange(id as Section)}
    />
  );
}
