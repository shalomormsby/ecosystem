# Sage UI

**The Solopreneur's Development Stack.**

`@thesage/ui` is the core component library for the Sage ecosystem. It provides a comprehensive set of accessible, reusable, and composable UI components built on top of Radix UI and Tailwind CSS.

## Features

- 🎨 **Systematic Design**: Built on a robust token system for consistent implementation.
- ♿ **Accessible**: rigorous adherence to WAI-ARIA standards (via Radix UI).
- 🌓 **Dark Mode**: First-class support for light and dark themes.
- 🧩 **Composable**: components are designed to be composed together to build complex interfaces.
- 🚀 **Performance**: Exported as tree-shakeable ESM modules.

## Installation

```bash
npm install @thesage/ui
# or
pnpm add @thesage/ui
# or
yarn add @thesage/ui
```

## Usage

```tsx
import { Button } from '@thesage/ui';

export default function MyComponent() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Hello World
    </Button>
  );
}
```

## Documentation

For full documentation, component examples, and guides, visit **[thesage.dev](https://thesage.dev)**.

## License

MIT © [Shalom Ormsby](https://github.com/shalomormsby)
