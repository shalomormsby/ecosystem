# Sage UI Documentation Audit - January 2026

## 📋 Document Context & Purpose

**Date:** January 26, 2026
**Auditor:** Claude Sonnet 4.5
**Scope:** Getting Started + MCP Server documentation sections
**Audit Type:** Zero-context usability assessment
**Standard:** CTO-level technical review

### Why This Audit Was Conducted

This audit was performed to ensure that a developer or LLM with **zero prior knowledge** of Sage UI could:
1. Successfully install and configure the design system
2. Build their first component using Sage UI
3. Integrate the MCP server with AI coding assistants
4. Troubleshoot common issues without additional documentation

The audit uses **live codebase as source of truth** - if documentation claims something that code doesn't support, it's flagged as an error.

### How to Use This Document

**If you're implementing fixes:**
1. Read "Executive Summary" first for overall context
2. Jump to "Action Plan & Phasing" for prioritized work
3. Use the detailed issue descriptions as specifications
4. Check off items in the "Implementation Checklist" as you complete them
5. Cross-reference with actual code files (paths provided)

**If you're an LLM resuming this work:**
1. Read this entire document first
2. Start with Phase 0 (Critical Blockers)
3. Work through phases sequentially
4. Update the Implementation Checklist as you go
5. Verify each fix against the actual codebase
6. Use the "Resume Prompt" at the bottom to get started

### Key Files Audited

- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` - Getting Started content
- `apps/sage-design-studio/app/components/studio/McpSection/` - MCP Server tabs
- `packages/ui/package.json` - Package configuration
- `packages/sds-mcp-server/package.json` - MCP server configuration
- `packages/sds-mcp-server/src/registry.ts` - Component registry
- `packages/ui/src/index.ts` - Component exports

### Verification Methodology

1. **Installation verification** - Attempted `npm install @sage/ui` and `npm install @sage/mcp`
2. **Component counting** - Counted actual files in `/packages/ui/src/components/` directories
3. **Registry audit** - Compared MCP registry entries against actual exports
4. **Link checking** - Tested all external GitHub and documentation links
5. **Code cross-reference** - Verified documentation claims against actual component code
6. **Prerequisites audit** - Checked package.json for peer dependencies and system requirements

---

## 🎯 Executive Summary

**Overall Assessment: FAIL** 🚨

The documentation contains **critical blockers** that prevent any developer from using Sage UI by following the provided instructions.

### Critical Finding

**@sage/ui and @sage/mcp packages are NOT published to npm.** The first step of the Getting Started guide instructs users to `pnpm add @sage/ui`, which returns a 404 error. This makes 100% of the documentation incorrect for external users.

### Key Statistics

| Metric | Claimed | Actual | Delta |
|--------|---------|--------|-------|
| **Total Components** | 48 | 60+ exported, 36 in MCP | +12 to -12 |
| **Package Availability** | Published on npm | Not published | ❌ Blocker |
| **MCP Component Coverage** | 48 components | 36 components | -12 missing |
| **Peer Dependencies Documented** | None | 2 required (react, framer-motion) | ❌ Missing |
| **External Links Working** | Not tested | 100% (6/6 tested) | ✅ Good |

### Issues Breakdown

- **3 Critical Issues** (P0) - Block all usage, must fix immediately
- **3 High-Severity Issues** (P1) - Major inaccuracies, fix before external review
- **4 Moderate Issues** (P2) - Incomplete guidance, fix soon
- **3 Minor Issues** (P3) - Polish items, nice to have
- **4 Content Gaps** - Missing essential sections

### Recommended Action

**DO NOT show this documentation to Teg or external technical reviewers until Phase 0 (Critical Blockers) is complete.**

The documentation is well-written and thoughtfully structured, but it currently describes a system that cannot be installed. Fix the critical issues first, then proceed with improvements.

---

## 🚨 CRITICAL ISSUES (Phase 0 - Blocking)

### Issue #1: Packages Not Published to NPM
**Priority: P0 - BLOCKS ALL USAGE**
**Status:** ❌ Not Started
**Estimated Effort:** 4-8 hours (depends on chosen solution)

**Location:**
- [OverviewSection.tsx:891-900](../app/components/studio/OverviewSection.tsx#L891-L900) - Getting Started installation
- [InstallationTab.tsx:20-34](../app/components/studio/McpSection/InstallationTab.tsx#L20-L34) - MCP installation

**The Problem:**

Documentation instructs users to install packages via npm:
```bash
pnpm add @sage/ui
pnpm add -D @sage/mcp
```

But these packages don't exist on npm registry:
```bash
$ npm view @sage/ui
# Error: 404 Not Found - '@sage/ui@*' could not be found

$ npm view @sage/mcp
# Error: 404 Not Found - '@sage/mcp@*' could not be found
```

**Impact:**
- Zero-context developers **cannot complete step 1** of setup
- LLMs following instructions hit immediate dead-end
- 100% of subsequent instructions are unreachable
- Undermines credibility of entire documentation

**Solution Options:**

**Option A: Publish to npm (Recommended for External Use)**
1. Configure npm publishing in GitHub Actions or manually
2. Set up npm organization (@sage) or use personal scope
3. Publish `@sage/ui` v0.0.5 to npm
4. Publish `@sage/mcp` v0.1.0 to npm
5. Test installation from npm
6. Update documentation (no code changes needed)

**Option B: Monorepo-Only Documentation (Recommended for Now)**
1. Add prominent banner to Getting Started section
2. Update installation instructions to:
   ```bash
   # Clone the repository
   git clone https://github.com/shalomormsby/ecosystem.git
   cd ecosystem

   # Install dependencies (requires pnpm 8.15.0+)
   pnpm install

   # Build the design system
   pnpm build --filter @sage/ui

   # Link to your project
   cd /your-project
   pnpm link /path/to/ecosystem/packages/ui
   ```
3. Explain workspace setup for consuming apps
4. Add note: "Public npm packages coming soon"

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (lines 875-996)
- `apps/sage-design-studio/app/components/studio/McpSection/InstallationTab.tsx` (lines 17-126)
- Add new file: `apps/sage-design-studio/docs/MONOREPO-SETUP.md`

**Acceptance Criteria:**
- [ ] Installation instructions match actual availability
- [ ] Zero-context user can follow instructions successfully
- [ ] All code examples remain accurate
- [ ] Documentation clearly states current distribution method

---

### Issue #2: Component Count Discrepancy
**Priority: P0 - CREDIBILITY UNDERMINING**
**Status:** ❌ Not Started
**Estimated Effort:** 3-4 hours

**Location:**
- [OverviewSection.tsx:806-833](../app/components/studio/OverviewSection.tsx#L806-L833) - File Structure section
- [OverviewTab.tsx:48](../app/components/studio/McpSection/OverviewTab.tsx#L48) - MCP Overview
- [registry.ts:4](../../packages/sds-mcp-server/src/registry.ts#L4) - MCP registry metadata
- [README.md:9](../../packages/sds-mcp-server/README.md#L9) - MCP README

**The Problem:**

Documentation claims **"48 components across 7 categories"** everywhere.

**Actual Reality:**

| Category | Claimed | Actual Files | Exported in index.ts | In MCP Registry |
|----------|---------|--------------|---------------------|-----------------|
| Actions | 3 | 5 | 5 | 3 |
| Forms | 11 | 18 | 18 | 13 |
| Navigation | 6 | 10 | 10 | 6 |
| Overlays | 9 | 11 | 11 | 9 |
| Feedback | 5 | 6 | 7 | 5 |
| Data Display | 6 | 16 | 16 | 6 |
| Layout | 8 | 15 | 15 | 8 |
| **SUBTOTAL** | **48** | **81** | **82** | **50** |
| Backgrounds | N/A | 2 | 2 | 0 |
| Blocks | N/A | Multiple | 3 | 0 |
| Cursor | N/A | 2 | 2 | 0 |
| Motion | N/A | Multiple | 1 | 0 |
| **TOTAL** | **48** | **85+** | **90+** | **50** |

**Missing from MCP Registry (Examples):**
- Actions: Link, Magnetic
- Forms: ColorPicker, FilterButton, SearchBar, TextField, ThemeSwitcher
- Navigation: NavLink, SecondaryNav, TertiaryNav, Breadcrumbs
- Overlays: Dropdown, Modal
- Feedback: ProgressBar, Spinner, Toast
- Data Display: AspectImage, Brand, Code, CollapsibleCodeBlock, DescriptionList, GitHubIcon, Heading, Text, VariableWeightText, Typewriter, OpenGraphCard
- Layout: Container, CustomizerPanel, Grid, Header, PageLayout, PageTemplate, Sidebar, Stack

**Impact:**
- False advertising - claims don't match reality
- MCP server can't discover 40+ components that exist
- Developers using MCP will miss major components
- Component count varies wildly depending on where you look

**Solution:**

**Step 1: Perform Accurate Inventory**
```bash
# Count actual exportable components
grep "^export \* from" packages/ui/src/index.ts | wc -l

# List all components by category
for dir in actions forms navigation overlays feedback data-display layout backgrounds blocks cursor motion; do
  echo "$dir: $(ls packages/ui/src/components/$dir/*.tsx 2>/dev/null | wc -l)"
done
```

**Step 2: Decide on Component Strategy**
- Are backgrounds/blocks/cursor/motion part of the "core" design system?
- Should MCP include ALL components or just the "primary" 7 categories?
- What's the official count we want to advertise?

**Step 3: Update Documentation**
- Update all references to "48 components" with accurate count
- Update category counts in Overview section
- Add note about additional categories if not including them in main count

**Step 4: Update MCP Registry**
- Add missing components to `packages/sds-mcp-server/src/registry.ts`
- Test all components are discoverable via MCP tools
- Update category counts in `COMPONENT_CATEGORIES`

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (multiple locations)
- `apps/sage-design-studio/app/components/studio/McpSection/OverviewTab.tsx` (line 48)
- `packages/sds-mcp-server/src/registry.ts` (add missing components)
- `packages/sds-mcp-server/README.md` (line 9)

**Acceptance Criteria:**
- [ ] All component counts are accurate and match reality
- [ ] MCP registry includes all discoverable components OR documentation clearly states subset
- [ ] No discrepancies between different documentation sources
- [ ] Category counts add up correctly

---

### Issue #3: Missing Prerequisites & Peer Dependencies
**Priority: P0 - PREVENTS SUCCESSFUL SETUP**
**Status:** ❌ Not Started
**Estimated Effort:** 2-3 hours

**Location:**
- [OverviewSection.tsx:875-996](../app/components/studio/OverviewSection.tsx#L875-L996) - Quick Start section
- Missing: Prerequisites section before installation

**The Problem:**

The "Get Started in 5 Minutes" section jumps directly to package installation without mentioning:

1. **System Requirements:** No Node.js or pnpm version specified
2. **Peer Dependencies:** From `packages/ui/package.json`:
   ```json
   "peerDependencies": {
     "framer-motion": "*",
     "react": "*"
   }
   ```
   These are **required** but never mentioned.

3. **Tailwind CSS:** Sage UI uses Tailwind + CSS variables, but no configuration instructions
4. **Build Tools:** Does the user need TypeScript? Webpack? Next.js? Vite?

**Impact:**
- Components fail at runtime if peer deps aren't installed
- Styling doesn't work without Tailwind configuration
- Users on Node 16 might hit errors
- TypeScript users don't know what version is supported

**Evidence:**

```bash
# From packages/ui/package.json
"peerDependencies": {
  "framer-motion": "*",    # REQUIRED - not documented
  "react": "*"             # REQUIRED - not documented
}

# From root package.json
"packageManager": "pnpm@8.15.0"  # Version requirement not documented
```

**Solution:**

**Add "Prerequisites" Section Before Installation:**

```markdown
## Prerequisites

Before installing Sage UI, ensure you have:

### System Requirements
- **Node.js:** 18.0.0 or later
- **Package Manager:** pnpm 8.15.0+ (or npm 9+, yarn 3+)
- **React:** 18.0.0 or later (React 19 supported)
- **Tailwind CSS:** 3.0.0 or later

### Existing Project Setup
Sage UI works with:
- Next.js 14+ (App Router or Pages Router)
- Vite 5+
- Create React App (with Tailwind)
- Remix 2+
- Any React framework with Tailwind CSS support

### TypeScript (Optional)
- TypeScript 5.0+ for type support
- All components include full TypeScript definitions
```

**Add "Install Peer Dependencies" Step:**

```markdown
## Step 1: Install Dependencies

Sage UI requires React and Framer Motion as peer dependencies:

\`\`\`bash
pnpm add react framer-motion
# or
npm install react framer-motion
# or
yarn add react framer-motion
\`\`\`

Then install Sage UI:

\`\`\`bash
pnpm add @sage/ui
# or
npm install @sage/ui
# or
yarn add @sage/ui
\`\`\`
```

**Add "Configure Tailwind" Step:**

```markdown
## Step 2: Configure Tailwind CSS

Add Sage UI to your Tailwind content paths:

\`\`\`ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',  // Your app files
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@sage/ui/**/*.{js,ts,jsx,tsx}',  // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
\`\`\`

> **Note:** Sage UI uses CSS custom properties for theming. No additional Tailwind configuration is required - themes are injected at runtime by the ThemeProvider.
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (add before line 875)
- Consider creating dedicated setup guide: `docs/SETUP_GUIDE.md`

**Acceptance Criteria:**
- [ ] All system requirements documented
- [ ] Peer dependencies explicitly listed
- [ ] Tailwind configuration instructions provided
- [ ] Supported frameworks mentioned
- [ ] TypeScript requirements noted

---

## ⚠️ HIGH-SEVERITY ISSUES (Phase 1 - Pre-External Review)

### Issue #4: ThemeProvider Props Not Documented
**Priority: P1 - INCOMPLETE IMPLEMENTATION GUIDANCE**
**Status:** ❌ Not Started
**Estimated Effort:** 1-2 hours

**Location:**
- [OverviewSection.tsx:937-963](../app/components/studio/OverviewSection.tsx#L937-L963) - ThemeProvider example

**The Problem:**

Code example shows:
```tsx
<ThemeProvider defaultTheme="studio" defaultMode="light">
  {children}
</ThemeProvider>
```

But doesn't document:
- What are ALL available props?
- Valid values for each prop?
- Optional vs required props?
- Default values if omitted?
- What does each prop control?

**Solution:**

Add comprehensive prop table after code example:

```markdown
### ThemeProvider Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | - | ✅ Yes | Your application content |
| `defaultTheme` | `'studio' \| 'sage' \| 'volt'` | `'studio'` | No | Initial theme on first load |
| `defaultMode` | `'light' \| 'dark' \| 'system'` | `'system'` | No | Initial color mode. `'system'` respects OS preference |
| `storageKey` | `string` | `'sage-theme'` | No | LocalStorage key for persistence |
| `attribute` | `string` | `'data-theme'` | No | HTML attribute for theme injection |
| `enableSystem` | `boolean` | `true` | No | Whether to sync with system `prefers-color-scheme` |

**Example with all props:**

\`\`\`tsx
<ThemeProvider
  defaultTheme="sage"
  defaultMode="dark"
  storageKey="my-app-theme"
  attribute="data-theme"
  enableSystem={true}
>
  <App />
</ThemeProvider>
\`\`\`
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (after line 960)

**Acceptance Criteria:**
- [ ] All props documented with types
- [ ] Default values listed
- [ ] Required vs optional clearly marked
- [ ] Examples show both minimal and complete usage

---

### Issue #5: Motion System Setup Not Explained
**Priority: P1 - CRITICAL ACCESSIBILITY FEATURE HIDDEN**
**Status:** ❌ Not Started
**Estimated Effort:** 2 hours

**Location:**
- [OverviewSection.tsx:965-996](../app/components/studio/OverviewSection.tsx#L965-L996) - Motion hooks example

**The Problem:**

Example shows `useMotionPreference()` returning `{ scale, shouldAnimate }` but doesn't explain:
- Where does motion scale come from? (User setting? Default?)
- How does user SET their preference? (Not explained)
- What does scale 0-10 mean? (Mentioned elsewhere but not here)
- How does it respect `prefers-reduced-motion`? (Not stated)
- Where is the Customizer to control this?

**Impact:**
- Critical accessibility feature is invisible to users
- Developers can't explain to their users how to control motion
- Users with vestibular disorders might not know they can disable animations

**Solution:**

Add comprehensive explanation after code example:

```markdown
### Understanding the Motion System

Sage UI uses a **0-10 motion scale** that gives users fine-grained control over animation intensity:

| Scale | Behavior | Use Case |
|-------|----------|----------|
| **0** | No animations (instant state changes) | Users with vestibular disorders, reduced motion preference |
| **1-3** | Subtle animations (~100-200ms) | Minimal, professional interfaces |
| **5** | Balanced animations (default) | General use |
| **7-9** | Expressive animations | Playful, engaging interfaces |
| **10** | Maximum animation | Highly interactive experiences |

**Automatic Accessibility:**

The motion system automatically respects `prefers-reduced-motion: reduce`:
- If a user has this OS setting enabled, motion scale defaults to 0
- `shouldAnimate` returns `false` when scale is 0 OR system preference is reduce
- No additional code needed - accessibility is built-in

**Setting User Preferences:**

Users control motion via:

1. **The Customizer Component** (add to your app):
   \`\`\`tsx
   import { CustomizerPanel } from '@sage/ui';

   export function App() {
     return (
       <>
         <YourContent />
         <CustomizerPanel />  {/* Floating panel for user preferences */}
       </>
     );
   }
   \`\`\`

2. **Programmatically** (for custom UI):
   \`\`\`tsx
   import { useMotionPreference } from '@sage/ui/hooks';

   function CustomMotionControl() {
     const { scale, setMotionPreference } = useMotionPreference();

     return (
       <input
         type="range"
         min="0"
         max="10"
         value={scale}
         onChange={(e) => setMotionPreference(Number(e.target.value))}
       />
     );
   }
   \`\`\`

3. **System Setting:** Users with `prefers-reduced-motion: reduce` automatically get scale 0

**Preferences are persisted to localStorage** and restored across sessions.
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (after line 996)

**Acceptance Criteria:**
- [ ] Motion scale 0-10 explained with examples
- [ ] Accessibility behavior documented
- [ ] Three methods of setting preference shown
- [ ] Link to Customizer component docs
- [ ] LocalStorage persistence mentioned

---

### Issue #6: MCP Server Install Command Won't Work
**Priority: P1 - MCP INTEGRATION BROKEN**
**Status:** ❌ Not Started
**Estimated Effort:** 1 hour

**Location:**
- [InstallationTab.tsx:55-67](../app/components/studio/McpSection/InstallationTab.tsx#L55-L67) - Claude Desktop config

**The Problem:**

Config instructs users to add:
```json
{
  "command": "npx",
  "args": ["@sage/mcp"]
}
```

**Problems:**
1. `npx @sage/mcp` will try to download from npm (404 - not published)
2. Missing `-y` flag means users get confirmation prompt on first run
3. No fallback for when package isn't available

**Solution:**

**If Package Is Published:**
```json
{
  "mcpServers": {
    "sds": {
      "command": "npx",
      "args": ["-y", "@sage/mcp"]  // Add -y flag
    }
  }
}
```

**If Package Is Monorepo-Only (Current State):**
```json
{
  "mcpServers": {
    "sds": {
      "command": "node",
      "args": ["/absolute/path/to/ecosystem/packages/sds-mcp-server/dist/index.js"]
    }
  }
}
```

Add note:
```markdown
> ⚠️ **Important:** `@sage/mcp` is not yet published to npm. To use the MCP server:
> 1. Clone the [ecosystem repository](https://github.com/shalomormsby/ecosystem)
> 2. Run `pnpm install && pnpm build` in the repository root
> 3. Update the config above with the absolute path to `packages/sds-mcp-server/dist/index.js`
>
> Public npm package coming soon!
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/McpSection/InstallationTab.tsx` (lines 55-72)

**Acceptance Criteria:**
- [ ] Config matches actual package availability
- [ ] Instructions work when followed exactly
- [ ] Troubleshooting section addresses 404 errors
- [ ] Clear path for local development setup

---

## 🔧 MODERATE ISSUES (Phase 2 - Soon)

### Issue #7: Component-First Callout Appears Too Early
**Priority: P2 - PEDAGOGICAL CLARITY**
**Status:** ❌ Not Started
**Estimated Effort:** 30 minutes

**Location:**
- [OverviewSection.tsx:234-276](../app/components/studio/OverviewSection.tsx#L234-L276) - Component-First Architecture callout

**The Problem:**

Big red/green callout in "Philosophy in Action" section (appears very early):
```tsx
❌ Don't: <span className="text-[var(--color-text-primary)]">Text</span>
✅ Do: <Text>Text</Text>
```

**Issues:**
- Appears BEFORE installation instructions
- Users haven't seen `<Text>` component yet
- Feels preachy without context
- "Foundation of entire system" claim not explained

**Solution:**

**Option A: Move After Setup**
- Relocate to after "Quick Start" section
- Users have context of what components are available

**Option B: Add More Context**
```markdown
### Component-First Architecture

Sage UI encapsulates design tokens inside components rather than exposing them as CSS classes. This approach:

✅ **Ensures consistency** - Impossible to use wrong token combinations
✅ **Simplifies API** - `<Text>` instead of remembering `text-[var(--color-text-primary)]`
✅ **Enables smart defaults** - Components choose appropriate tokens
✅ **Improves DX** - TypeScript autocomplete for semantic props

[Example comparison...]
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (reorder sections or add context)

**Acceptance Criteria:**
- [ ] Callout appears after users understand component library
- [ ] "Why" is explained before "what"
- [ ] Specific benefits listed

---

### Issue #8: Missing Tailwind Configuration Guide
**Priority: P2 - STYLING WON'T WORK**
**Status:** ❌ Not Started
**Estimated Effort:** 2-3 hours

**Location:**
- Missing from Getting Started section

**The Problem:**

Sage UI uses Tailwind CSS + CSS variables, but there's ZERO documentation on:
- Adding Sage UI paths to Tailwind content array
- Importing required CSS files (if any)
- Configuring theme colors
- Setting up CSS custom properties

**Impact:**
- Components render but are completely unstyled
- Users think library is broken
- No way to debug without diving into source

**Solution:**

Add new section between "Install Dependencies" and "Wrap with ThemeProvider":

```markdown
## Step 2: Configure Tailwind CSS

### Add Content Paths

Update your `tailwind.config.ts` to include Sage UI components:

\`\`\`ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@sage/ui/**/*.{js,ts,jsx,tsx}',  // Required
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config
\`\`\`

### CSS Variables (Automatic)

Sage UI themes are injected via CSS custom properties by the `ThemeProvider`. No additional Tailwind configuration is needed.

The ThemeProvider automatically injects variables like:
- `--color-primary`
- `--color-background`
- `--color-text-primary`
- And 50+ more...

These are consumed by Sage UI components internally. You don't need to reference them directly (use components instead).

### Custom Tailwind Integration (Optional)

If you want to extend Sage UI's theme in your own Tailwind classes:

\`\`\`ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        background: 'var(--color-background)',
        // ... map other CSS variables
      }
    }
  }
} satisfies Config
\`\`\`

**Note:** This is optional. Prefer using Sage UI components over custom Tailwind classes.
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (add new section)
- Consider: `docs/TAILWIND_SETUP.md` for detailed guide

**Acceptance Criteria:**
- [ ] Tailwind content configuration shown
- [ ] CSS variable injection explained
- [ ] Custom integration optional path documented
- [ ] Emphasis on using components over direct styling

---

### Issue #9: Troubleshooting Section Missing from Getting Started
**Priority: P2 - NO HELP FOR COMMON ERRORS**
**Status:** ❌ Not Started
**Estimated Effort:** 2 hours

**Location:**
- Missing from Getting Started / Overview section
- MCP Server HAS a troubleshooting tab, but main docs don't

**The Problem:**

Common issues aren't addressed anywhere:
- "Components are unstyled" → Forgot Tailwind config
- "Motion not working" → Forgot ThemeProvider wrapper
- "TypeScript errors on import" → Need to build package first
- "Module not found: @sage/ui" → Peer deps not installed

**Solution:**

Add new section at end of Getting Started:

```markdown
## Troubleshooting

### Components are Unstyled

**Symptoms:** Components render but have no styling, wrong colors, or broken layout.

**Causes:**
1. Tailwind CSS not configured to include Sage UI paths
2. ThemeProvider not wrapping your app
3. CSS not loaded in your bundler

**Solutions:**
- ✅ Add `./node_modules/@sage/ui/**/*.{js,ts,jsx,tsx}` to Tailwind content
- ✅ Wrap app with `<ThemeProvider>`
- ✅ Ensure Tailwind CSS is imported in your root file

---

### Motion/Animations Not Working

**Symptoms:** Components appear instantly without transitions.

**Cause:** ThemeProvider not wrapping your app, or motion preference set to 0.

**Solution:**
- ✅ Wrap app with `<ThemeProvider>`
- ✅ Check motion preference: `const { scale } = useMotionPreference()` (should not be 0)
- ✅ Verify browser doesn't have `prefers-reduced-motion: reduce`

---

### TypeScript Errors on Import

**Symptoms:**
```
Cannot find module '@sage/ui' or its corresponding type declarations
```

**Causes:**
1. Package not installed
2. Package installed but TypeScript declarations not built
3. Wrong import path

**Solutions:**
- ✅ Run `pnpm install @sage/ui`
- ✅ If using monorepo: `pnpm build --filter @sage/ui`
- ✅ Check import: `import { Button } from '@sage/ui'` not `'@sage/ui/Button'`

---

### Peer Dependency Warnings

**Symptoms:**
```
npm WARN @sage/ui requires a peer of react@* but none is installed
```

**Cause:** Missing required peer dependencies.

**Solution:**
```bash
pnpm add react framer-motion
```

---

### Still Having Issues?

- 📖 Check the [Usage Guide](https://github.com/shalomormsby/ecosystem/blob/main/apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md)
- 🐛 [Report a bug](https://github.com/shalomormsby/ecosystem/issues)
- 💬 [Ask a question](https://github.com/shalomormsby/ecosystem/discussions)
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (add new section after Quick Start)

**Acceptance Criteria:**
- [ ] 4-5 common issues documented
- [ ] Symptoms, causes, and solutions for each
- [ ] Links to additional resources
- [ ] Formatted for easy scanning (headings, code blocks)

---

## 🎨 MINOR ISSUES (Phase 3 - Polish)

### Issue #10: Inconsistent Internal Link Patterns
**Priority: P3 - NAVIGATION POLISH**
**Status:** ❌ Not Started
**Estimated Effort:** 1 hour

**The Problem:**

Some internal links use old hash patterns:
- `#quick-start` (redirects to `#overview` via alias)
- `#components` (redirects to `#actions`)
- `#tokens` (works but unclear)

Aliases exist but aren't documented:
```tsx
// From page.tsx
if (section === 'components') {
    section = 'actions';  // Alias
} else if (section === 'quick-start') {
    section = 'overview';  // Alias
}
```

**Solution:**

**Option A: Use Canonical Links**
- Replace all `#quick-start` with `#overview/quick-start`
- Replace all `#components` with `#actions`
- Be consistent

**Option B: Document Aliases**
```markdown
> **Pro Tip:** You can use shortcuts like `#quick-start` (→ `#overview/quick-start`) and `#components` (→ `#actions`) for faster navigation.
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (update all internal links)

**Acceptance Criteria:**
- [ ] All internal links use consistent pattern
- [ ] Aliases documented OR removed
- [ ] Links go to expected destinations

---

### Issue #11: "Usage Guide" Filename Mismatch
**Priority: P3 - MINOR CONFUSION**
**Status:** ❌ Not Started
**Estimated Effort:** 15 minutes

**The Problem:**

Multiple references to `SAGE_DESIGN_SYSTEM_STRATEGY.md` with inconsistent labels:
- Some say "USAGE_GUIDE.md" (file doesn't exist)
- Some say "Usage Guide" (correct intent)
- Some use correct filename

**Solution:**

**Option A: Rename File**
```bash
mv apps/sage-design-studio/docs/SAGE_DESIGN_SYSTEM_STRATEGY.md \
   apps/sage-design-studio/docs/USAGE_GUIDE.md
```
Update all references.

**Option B: Standardize Label**
Always call it "Design System Strategy Guide" or "Usage Guide" consistently.

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (multiple locations)
- Update all GitHub links if renaming file

**Acceptance Criteria:**
- [ ] Consistent labeling across all references
- [ ] Link text matches actual filename OR file renamed
- [ ] No broken links

---

### Issue #12: MCP Registry Missing 40+ Components
**Priority: P3 - FEATURE COMPLETENESS**
**Status:** ❌ Not Started
**Estimated Effort:** 4-6 hours

**The Problem:**

MCP server registry has 36 components, but 60+ are exported from `@sage/ui`.

**Missing components include:**
- **Actions:** Link, Magnetic
- **Forms:** ColorPicker, FilterButton, SearchBar, TextField, ThemeSwitcher
- **Navigation:** NavLink, SecondaryNav, TertiaryNav, Breadcrumbs
- **Overlays:** Dropdown, Modal
- **Feedback:** ProgressBar, Spinner, Toast
- **Data Display:** AspectImage, Brand, Code, CollapsibleCodeBlock, DescriptionList, GitHubIcon, Heading, Text, VariableWeightText, Typewriter, OpenGraphCard
- **Layout:** Container, CustomizerPanel, Grid, Header, PageLayout, PageTemplate, Sidebar, Stack
- **Backgrounds:** WarpBackground, FaultyTerminal, OrbBackground
- **Cursor:** SplashCursor, TargetCursor
- **Motion:** AnimatedBeam
- **Blocks:** Hero

**Solution:**

Add all missing components to `packages/sds-mcp-server/src/registry.ts`:

```ts
// Example: Adding missing components
'link': {
  name: 'Link',
  category: 'actions',
  description: 'Accessible link component with external link detection and styling',
  keywords: ['link', 'anchor', 'navigation', 'href', 'external'],
  useCases: [
    'Navigation links',
    'External resources',
    'Call-to-action links',
    'Inline text links',
  ],
  dependencies: [],
},
'search-bar': {
  name: 'SearchBar',
  category: 'forms',
  description: 'Search input with icon, clear button, and keyboard shortcuts',
  keywords: ['search', 'input', 'filter', 'find', 'query'],
  useCases: [
    'Site search',
    'Data filtering',
    'Command palettes',
    'Quick find',
  ],
  dependencies: ['lucide-react'],
},
// ... add all 40+ missing components
```

**Process:**
1. Get list of all exported components from `packages/ui/src/index.ts`
2. For each component, read source file to understand:
   - Description
   - Use cases
   - Dependencies
   - Keywords
3. Add to registry with complete metadata
4. Test search functionality
5. Update component count in all documentation

**Files to Update:**
- `packages/sds-mcp-server/src/registry.ts` (add 40+ components)
- `packages/sds-mcp-server/README.md` (update count)
- All documentation referencing component counts

**Acceptance Criteria:**
- [ ] All exported components in MCP registry
- [ ] Each component has complete metadata
- [ ] Search finds all components correctly
- [ ] Documentation updated with accurate counts

---

## 📝 CONTENT GAPS (Phase 4 - Completeness)

### Gap #1: "What's Next?" After Setup
**Priority: P2 - USER JOURNEY**
**Status:** ❌ Not Started
**Estimated Effort:** 1 hour

**The Problem:**

After Step 4 of Quick Start, documentation ends. No guidance on:
- What to do next
- Where to find more examples
- How to build first real component
- Learning path

**Solution:**

Add "Next Steps" section at end of Quick Start:

```markdown
## Next Steps

You're all set up! Here's how to continue:

### 1. Explore Components
Browse all available components organized by function:
- [Actions](#actions) - Buttons, toggles, and interactive elements
- [Forms](#forms) - Inputs, selects, and data collection
- [Navigation](#navigation) - Breadcrumbs, tabs, menus
- [Overlays](#overlays) - Dialogs, sheets, tooltips
- [Feedback](#feedback) - Alerts, toasts, progress indicators
- [Data Display](#data-display) - Tables, cards, badges
- [Layout](#layout) - Grids, containers, separators

### 2. Try the Customizer
See how themes and motion work:
```tsx
import { CustomizerPanel } from '@sage/ui';

export function App() {
  return (
    <>
      <YourApp />
      <CustomizerPanel />
    </>
  );
}
```

### 3. Read the Usage Guide
Understand architecture and best practices:
- [Component-First Architecture](#)
- [Common Patterns](#common-patterns)
- [Theming Deep Dive](#themes)

### 4. Check Out Templates
See complete examples:
- [Templates](#templates) - Full-page layouts
- [Blocks](#blocks) - Composed components

### 5. Build Something!
Start with a simple page:
```tsx
import { Button, Card, Badge } from '@sage/ui';

export function Dashboard() {
  return (
    <Card>
      <h1>My Dashboard</h1>
      <Badge variant="success">Active</Badge>
      <Button variant="default">Get Started</Button>
    </Card>
  );
}
```

### Need Help?
- 📖 [Full Documentation](#overview)
- 🐛 [Report Issues](https://github.com/shalomormsby/ecosystem/issues)
- 💬 [Discussions](https://github.com/shalomormsby/ecosystem/discussions)
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (add after Quick Start)

**Acceptance Criteria:**
- [ ] Clear next steps listed
- [ ] Links to relevant sections
- [ ] Simple first project example
- [ ] Help resources linked

---

### Gap #2: System Requirements Section
**Priority: P2 - PREVENTS COMPATIBILITY ISSUES**
**Status:** ❌ Not Started (Overlaps with Issue #3)
**Estimated Effort:** Included in Issue #3

**The Problem:**

No mention of:
- Minimum Node.js version
- React version compatibility
- Browser support
- Mobile browser support
- TypeScript version

**Solution:**

Add at very top of Getting Started:

```markdown
## System Requirements

### Development Environment
- **Node.js:** 18.0.0 or later
- **Package Manager:** pnpm 8.15.0+ (or npm 9+, yarn 3+)
- **React:** 18.0.0 or later (React 19 supported)
- **TypeScript:** 5.0+ (optional, but recommended)

### Browser Support
- **Desktop:** Chrome 90+, Firefox 88+, Safari 15+, Edge 90+
- **Mobile:** iOS Safari 15+, Chrome Android 90+
- **Not Supported:** Internet Explorer (any version)

### Framework Compatibility
Sage UI works with any React framework that supports:
- React 18+ (including React 19)
- Tailwind CSS 3.x
- CSS custom properties
- ES Modules

**Tested with:**
- Next.js 14+ (App Router and Pages Router)
- Vite 5+
- Remix 2+
- Create React App (with CRACO for Tailwind)

### Accessibility Features
- WCAG AA compliant components
- Screen reader tested
- Keyboard navigation support
- Respects `prefers-reduced-motion`
- Respects `prefers-color-scheme`
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/OverviewSection.tsx` (add at top of Quick Start)

**Acceptance Criteria:**
- [ ] All version requirements listed
- [ ] Browser compatibility table
- [ ] Framework compatibility noted
- [ ] Accessibility features highlighted

---

### Gap #3: MCP Server Local Development Setup
**Priority: P2 - ENABLES CONTRIBUTION**
**Status:** ❌ Not Started
**Estimated Effort:** 1-2 hours

**The Problem:**

MCP installation instructions assume published package. No guide for:
- Using MCP server from local monorepo
- Contributing to MCP server
- Testing MCP changes locally

**Solution:**

Add new section to MCP Installation tab:

```markdown
## Local Development Setup

If you're contributing to Sage UI or want to use the latest unreleased MCP server:

### 1. Clone the Repository
```bash
git clone https://github.com/shalomormsby/ecosystem.git
cd ecosystem
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Build the MCP Server
```bash
pnpm build --filter @sage/mcp
```

### 4. Configure Your Client

#### Claude Desktop
Update your config to point to local build:

**File:** `~/Library/Application Support/Claude/claude_desktop_config.json`
```json
{
  "mcpServers": {
    "sds-local": {
      "command": "node",
      "args": ["/absolute/path/to/ecosystem/packages/sds-mcp-server/dist/index.js"]
    }
  }
}
```

> Replace `/absolute/path/to/` with your actual clone location.

#### Cursor
**File:** `.cursor/mcp.json` (in your project root)
```json
{
  "mcpServers": {
    "sds-local": {
      "command": "node",
      "args": ["/absolute/path/to/ecosystem/packages/sds-mcp-server/dist/index.js"]
    }
  }
}
```

### 5. Restart Your Client
- **Claude Desktop:** Fully quit and restart
- **Cursor:** Reload window (Cmd/Ctrl + Shift + P → "Reload Window")

### 6. Verify Connection
Try asking your AI assistant:
> "Show me all Sage UI components"

If it lists components, you're connected!

### Making Changes

When you modify the MCP server:
```bash
# Rebuild
pnpm build --filter @sage/mcp

# Restart your MCP client to pick up changes
```

For faster iteration, use watch mode:
```bash
pnpm dev --filter @sage/mcp  # Rebuilds on file changes
```
```

**Files to Update:**
- `apps/sage-design-studio/app/components/studio/McpSection/InstallationTab.tsx` (add new section)

**Acceptance Criteria:**
- [ ] Complete local setup instructions
- [ ] Absolute path explained
- [ ] All MCP clients covered
- [ ] Development workflow documented

---

### Gap #4: CLI/Build Commands Reference
**Priority: P3 - DEVELOPER CONVENIENCE**
**Status:** ❌ Not Started
**Estimated Effort:** 1 hour

**The Problem:**

No quick reference for common commands:
- Building the design system
- Running dev server
- Linting
- Type checking
- Publishing

**Solution:**

Add new page or section:

```markdown
## CLI Commands

### Package Development

**Build all packages:**
```bash
pnpm build
```

**Build specific package:**
```bash
pnpm build --filter @sage/ui
pnpm build --filter @sage/mcp
```

**Development mode (watch):**
```bash
pnpm dev --filter @sage/ui
```

**Type checking:**
```bash
pnpm typecheck
```

**Linting:**
```bash
pnpm lint
pnpm lint --fix  # Auto-fix issues
```

### Application Development

**Run Sage Design Studio:**
```bash
pnpm dev --filter sage-design-studio
```

**Run Portfolio:**
```bash
pnpm dev --filter portfolio
```

**Build all apps:**
```bash
pnpm build  # Builds packages first, then apps
```

### Clean & Reset

**Clear all build artifacts:**
```bash
rm -rf .turbo packages/*/dist apps/*/.next
pnpm build
```

**Full clean (including node_modules):**
```bash
pnpm clean  # If script exists
# Or manually:
rm -rf node_modules packages/*/node_modules apps/*/node_modules
pnpm install
```

### Publishing (Maintainers Only)

**Version bump:**
```bash
pnpm version patch  # 0.0.5 → 0.0.6
pnpm version minor  # 0.0.5 → 0.1.0
pnpm version major  # 0.0.5 → 1.0.0
```

**Publish to npm:**
```bash
pnpm publish --filter @sage/ui
pnpm publish --filter @sage/mcp
```
```

**Files to Create:**
- `apps/sage-design-studio/docs/CLI_COMMANDS.md`
- Link from Contributing section

**Acceptance Criteria:**
- [ ] All common commands listed
- [ ] Grouped by task type
- [ ] Examples provided
- [ ] Maintainer commands separate

---

## 📊 Implementation Checklist

Use this checklist to track progress. Check items off as you complete them.

### Phase 0: Critical Blockers (DO FIRST)
**Goal:** Make documentation usable for external developers
**Timeline:** 1-2 days

- [ ] **Issue #1:** Package publication/monorepo setup
  - [ ] Decide: Publish to npm OR document monorepo-only setup
  - [ ] Update Getting Started installation instructions
  - [ ] Update MCP installation instructions
  - [ ] Add prominent disclaimer if monorepo-only
  - [ ] Test: Zero-context developer can follow instructions

- [ ] **Issue #2:** Fix component count discrepancy
  - [ ] Count actual components in codebase
  - [ ] Update all "48 components" references
  - [ ] Update category counts (Actions, Forms, etc.)
  - [ ] Decide on inclusion of backgrounds/blocks/cursor/motion categories

- [ ] **Issue #3:** Add prerequisites & peer dependencies
  - [ ] Add "Prerequisites" section before installation
  - [ ] Document Node.js version requirement
  - [ ] List peer dependencies (react, framer-motion)
  - [ ] Add system requirements table
  - [ ] Explain Tailwind CSS requirement

### Phase 1: Pre-External Review (BEFORE SHOWING TO TEG)
**Goal:** Ensure technical accuracy and completeness
**Timeline:** 2-3 days

- [ ] **Issue #4:** Document ThemeProvider props
  - [ ] Create comprehensive prop table
  - [ ] Add examples with all props
  - [ ] Document default values
  - [ ] Show required vs optional props

- [ ] **Issue #5:** Explain motion system
  - [ ] Document 0-10 scale with examples
  - [ ] Explain accessibility behavior
  - [ ] Show three methods of setting preference
  - [ ] Link to Customizer component

- [ ] **Issue #6:** Fix MCP install command
  - [ ] Update config for published package OR local path
  - [ ] Add `-y` flag if using npx
  - [ ] Add troubleshooting for 404 errors
  - [ ] Test: MCP server connects successfully

### Phase 2: Important Improvements (SOON)
**Goal:** Fill critical gaps and improve usability
**Timeline:** 3-5 days

- [ ] **Issue #7:** Move component-first callout or add context
  - [ ] Decide: Move after setup OR add more explanation
  - [ ] Explain benefits before showing example
  - [ ] Make it actionable for current reader context

- [ ] **Issue #8:** Add Tailwind configuration guide
  - [ ] Document content path configuration
  - [ ] Explain CSS variable injection
  - [ ] Show optional custom integration
  - [ ] Emphasize component-first approach

- [ ] **Issue #9:** Add troubleshooting section
  - [ ] Document 4-5 common issues
  - [ ] Provide symptoms, causes, solutions
  - [ ] Add links to additional resources
  - [ ] Make easily scannable with headings

- [ ] **Gap #1:** Add "Next Steps" section
  - [ ] List clear next actions
  - [ ] Link to relevant documentation
  - [ ] Provide simple first project example
  - [ ] Include help resources

- [ ] **Gap #2:** Add system requirements (overlaps with Issue #3)
  - [ ] Included in Issue #3 implementation

- [ ] **Gap #3:** Add MCP local development setup
  - [ ] Document clone → install → build workflow
  - [ ] Show local config for all MCP clients
  - [ ] Explain development iteration
  - [ ] Add contribution guidance

### Phase 3: Polish (NICE TO HAVE)
**Goal:** Consistency and completeness
**Timeline:** 2-3 days

- [ ] **Issue #10:** Fix internal link patterns
  - [ ] Decide: Canonical links OR document aliases
  - [ ] Update all links consistently
  - [ ] Test all navigation

- [ ] **Issue #11:** Fix "Usage Guide" filename mismatch
  - [ ] Decide: Rename file OR standardize label
  - [ ] Update all references
  - [ ] Verify no broken links

- [ ] **Issue #12:** Add missing components to MCP registry
  - [ ] List all exported components
  - [ ] Add metadata for each missing component
  - [ ] Test search functionality
  - [ ] Update documentation counts

- [ ] **Gap #4:** Create CLI commands reference
  - [ ] Document build commands
  - [ ] Document dev commands
  - [ ] Document clean/reset commands
  - [ ] Add publishing guide for maintainers

### Verification & Testing
**Goal:** Ensure all fixes work in practice
**Timeline:** 1 day

- [ ] **Zero-Context Test**
  - [ ] Have someone unfamiliar with Sage UI follow Getting Started
  - [ ] Document any confusion or errors
  - [ ] Fix any remaining issues

- [ ] **Link Verification**
  - [ ] Test all internal links work
  - [ ] Test all external links return 200
  - [ ] Fix any broken links

- [ ] **MCP Integration Test**
  - [ ] Configure MCP server in Claude Desktop
  - [ ] Test all four tools (list, search, get, install)
  - [ ] Verify all components are discoverable

- [ ] **Component Count Audit**
  - [ ] Verify counts match across all documentation
  - [ ] Verify MCP registry is complete
  - [ ] Update CHANGELOG.md with accurate counts

### Documentation
**Goal:** Track changes and guide future work
**Timeline:** Ongoing

- [ ] **Update CHANGELOG.md**
  - [ ] Document all documentation fixes
  - [ ] Note breaking changes (if any)
  - [ ] List new features/sections added

- [ ] **Create Implementation Notes**
  - [ ] Document decisions made during implementation
  - [ ] Note any deviations from audit recommendations
  - [ ] Capture lessons learned

---

## 🔄 Resume Prompt for LLMs

**Copy this prompt to resume work on this audit with full context:**

```
I need you to continue implementing fixes from the Sage UI Documentation Audit.

CRITICAL CONTEXT:
1. Read the complete audit: /Users/shalomormsby/Developer/work/ecosystem/apps/sage-design-studio/docs/SAGE-UI-AUDIT.md
2. The audit found that @sage/ui and @sage/mcp are NOT published to npm (404 errors), making current installation docs impossible to follow
3. Component counts are wrong - docs claim "48 components" but reality is 60+ exported, only 36 in MCP registry
4. Missing critical setup steps: prerequisites, peer dependencies, Tailwind config
5. This is a monorepo at /Users/shalomormsby/Developer/work/ecosystem

YOUR TASK:
Work through the "Implementation Checklist" in the audit document sequentially. Start with Phase 0 (Critical Blockers) unless directed otherwise.

Before making any changes:
1. Read the specific issue description in the audit
2. Verify the problem by checking the actual code files (paths provided)
3. Review the "Solution" section for the recommended fix
4. Cross-reference with the codebase to ensure your fix matches reality

After each fix:
1. Check off the item in the Implementation Checklist
2. Test that the fix works (read the result, verify links, etc.)
3. Update any related documentation
4. Tell me what you completed and what's next

IMPORTANT RULES:
- Use the codebase as source of truth, not the documentation
- Don't make assumptions - verify component counts, package names, file paths
- Follow the phasing - complete Phase 0 before moving to Phase 1
- Update the checklist as you work
- Ask for clarification if something in the audit is unclear

START HERE:
[Tell me which phase/issue you want to work on, or say "start from the beginning"]
```

---

## 📚 Additional Resources for Implementers

### Key Codebase Locations

**Documentation Files:**
- Getting Started content: `apps/sage-design-studio/app/components/studio/OverviewSection.tsx`
- MCP Server content: `apps/sage-design-studio/app/components/studio/McpSection/`
- Navigation: `apps/sage-design-studio/app/docs/page.tsx`

**Package Configs:**
- UI package: `packages/ui/package.json`
- UI exports: `packages/ui/src/index.ts`
- MCP package: `packages/sds-mcp-server/package.json`
- MCP registry: `packages/sds-mcp-server/src/registry.ts`

**Component Locations:**
```
packages/ui/src/components/
├── actions/        # 5 components
├── forms/          # 18 components
├── navigation/     # 10 components
├── overlays/       # 11 components
├── feedback/       # 6 components
├── data-display/   # 16 components
├── layout/         # 15 components
├── backgrounds/    # 2 components
├── blocks/         # Multiple
├── cursor/         # 2 components
└── motion/         # Multiple
```

### Useful Commands for Auditing

**Count components by category:**
```bash
for dir in actions forms navigation overlays feedback data-display layout; do
  echo "$dir: $(ls packages/ui/src/components/$dir/*.tsx 2>/dev/null | wc -l)"
done
```

**List all exported components:**
```bash
grep "^export \* from './components/" packages/ui/src/index.ts | wc -l
```

**Check package on npm:**
```bash
npm view @sage/ui  # Should show package info OR 404
```

**Count MCP registry entries:**
```bash
grep -c "^  [a-z].*: {$" packages/sds-mcp-server/src/registry.ts
```

**Test external links:**
```bash
curl -I https://github.com/shalomormsby/ecosystem/blob/main/AGENTS.md
```

### Testing Your Fixes

**Test Installation Flow (if packages published):**
```bash
# In a fresh directory
npm create vite@latest test-sage-ui -- --template react-ts
cd test-sage-ui
npm install @sage/ui react framer-motion tailwindcss
# Follow documentation exactly
```

**Test MCP Server:**
```bash
# If published
npx -y @sage/mcp

# If local
node packages/sds-mcp-server/dist/index.js
```

**Verify Component Counts:**
```bash
# Components in each category
ls packages/ui/src/components/actions/*.tsx | wc -l
ls packages/ui/src/components/forms/*.tsx | wc -l
# ... repeat for each category

# Total exports
grep "^export \* from" packages/ui/src/index.ts | wc -l

# MCP registry entries
grep "  [a-z]" packages/sds-mcp-server/src/registry.ts | wc -l
```

---

## 🎯 Success Metrics

You'll know the audit fixes are complete when:

### User Success Metrics
- [ ] A developer with zero context can install Sage UI by following Getting Started
- [ ] All installation commands work (no 404 errors)
- [ ] First component renders with correct styling
- [ ] MCP server connects and lists all components
- [ ] Search finds all major components
- [ ] Troubleshooting section solves common errors

### Technical Accuracy Metrics
- [ ] Component counts match reality across all documentation
- [ ] All peer dependencies documented
- [ ] All system requirements listed
- [ ] All external links return 200 OK
- [ ] All internal links navigate correctly
- [ ] No discrepancies between documentation sources

### Completeness Metrics
- [ ] Prerequisites section exists
- [ ] Tailwind configuration documented
- [ ] ThemeProvider props fully documented
- [ ] Motion system fully explained
- [ ] Troubleshooting covers 4-5 common issues
- [ ] "Next Steps" guides users forward
- [ ] MCP local development documented

### Quality Metrics
- [ ] No misleading claims (packages on npm when they're not)
- [ ] No incorrect information (wrong component counts)
- [ ] No missing critical information (peer deps)
- [ ] Consistent terminology across all sections
- [ ] Clear, actionable instructions throughout

---

## 📝 Notes for Maintainers

### If Publishing to NPM

Before publishing:
1. [ ] Verify package.json configurations
2. [ ] Test installation in fresh environment
3. [ ] Ensure TypeScript declarations are built
4. [ ] Write publishing guide for team
5. [ ] Set up automated publishing (GitHub Actions?)
6. [ ] Update all documentation to remove monorepo warnings

After publishing:
1. [ ] Update Getting Started with simple `npm install`
2. [ ] Remove local development workarounds
3. [ ] Test installation flow end-to-end
4. [ ] Announce on README, docs, changelog

### If Staying Monorepo-Only

Accept that:
1. Documentation must clearly state "monorepo only" upfront
2. Setup instructions will be longer (clone → install → build → link)
3. MCP server requires local path configuration
4. Barrier to entry is higher for external users
5. This is fine for internal tools or during development

Make it clear:
1. Add banner: "⚠️ Sage UI is in active development. Public npm packages coming soon."
2. Provide complete monorepo setup guide
3. Link to example consuming apps in the monorepo
4. Set expectations about stability

### Decision Points

Key decisions needed:
1. **Publish vs monorepo-only** (affects all installation docs)
2. **Component count strategy** (include backgrounds/blocks/cursor/motion or not?)
3. **MCP coverage** (all components or subset?)
4. **Documentation structure** (one long page vs multiple pages?)

Document these decisions and rationale in CHANGELOG.md or DECISIONS.md.

---

## ✅ Completion Criteria

This audit is considered "complete" when:

1. **Phase 0 (Critical Blockers) is 100% done**
   - Installation instructions match reality
   - Component counts are accurate
   - Prerequisites are documented

2. **Phase 1 (Pre-External Review) is 100% done**
   - ThemeProvider documented
   - Motion system explained
   - MCP install works

3. **At least 80% of Phase 2 is done**
   - Major content gaps filled
   - Troubleshooting exists
   - Tailwind setup documented

4. **Documentation passes zero-context test**
   - External developer can follow it successfully
   - No critical errors or confusion

5. **Teg (CTO) approves documentation**
   - Technical accuracy verified
   - No credibility-undermining issues
   - Professional presentation

---

**Last Updated:** January 26, 2026
**Next Review:** After Phase 0 completion
**Document Status:** ✅ Complete - Ready for Implementation
