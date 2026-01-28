# Sage Strategic Evolution: The Design Engine

**Document Status:** Draft / Strategy
**Date:** January 27, 2026
**Author:** Antigravity (AI) & User

## 1. The Core Pivot: From "UI Library" to "Design Engine"

The initial version of Sage UI was a "Kit of Parts"—a collection of high-quality components (`<Button>`, `<Card>`, `<Input>`) that users had to manually assemble. While valuable (Phase 1), this approach requires significant effort for every new page and places the burden of design coherence on the user.

**The Insight:** We are moving from manual assembly to **Architected Creation**.
We are building the **Sage Design Engine**: An intelligent system where users provide *content* and *intent*, and the system automatically renders high-quality, accessible, branded interfaces.

### The "Change Once, Ripple Everywhere" Promise
By abstracting page layouts into **Archetypes** (formerly Templates), we decouple *structure* from *content*.
- **Old Way:** "I need to update 50 individual pages because I want to change the header style."
- **New Way:** "I update one Archetype, and 50 pages transform instantly."

---

## 2. The New Hierarchy

To support this evolution, we must refine our mental model of the ecosystem. We represent this as a vertical stack:

| Layer | Old Name | New Name | Definition | Example |
| :--- | :--- | :--- | :--- | :--- |
| **1** | Design Tokens | **Tokens (DNA)** | The atomic visual values. The "Soul." | Colors, Spacing, Motion, Radii |
| **2** | UI Components | **Primitives** | The raw, functional building blocks. | `Button`, `Input`, `Badge`, `Text` |
| **3** | Blocks | **Patterns** | Precise solutions to specific functional needs. | `PricingTable`, `UserProfile`, `LoginForm` |
| **4** | Templates | **Archetypes** | Intelligent, opinionated page shells that accept data. | `SectionOverview`, `DashboardShell`, `DocsPage` |

**Strategic Shift:**
We stopped using "Blocks" because they were often just bigger Components. By renaming them **Patterns**, we clarify their role: they solve specific user problems. By renaming Templates to **Archetypes**, we elevate them from "boilerplate to copy" to "engines to run."

---

## 3. Data-Driven Design: The "Sage Stack"

The most efficient way to consume Sage UI is to treat the UI as a function of Data + Theme.

**The Equation:** `UI = Archetype(Data) + Theme`

### The Workflow
1.  **Input (The Fuel):** Pure JSON/Object data defining the *content*.
    ```json
    {
      "title": "Design Tokens",
      "badges": ["DNA", "Core"],
      "description": "The atomic units...",
      "children": [...]
    }
    ```
2.  **Process (The Engine):** An **Archetype** (`<SectionOverview />`) receives this data. It doesn't care about the content; it cares about the *structure*.
3.  **Context (The Soul):** The **Theme** ("Terra", "Volt") applies the aesthetic personality.
4.  **Output:** A fully realized page.

**Strategic Benefit:** This unlocks **AI Generation**. It is trivial for an LLM (MCP) to generate the JSON "Fuel." It is hard for it to write perfect JSX code. By standardizing Archetypes, you turn the MCP into a potent content injector.

---

## 4. The Personality Paradox: "Terra" vs. The Machine

**The Challenge:** Users fear that data-driven automation means everything will look "robotic" or "generic."
**The Solution:** Deep Theming & Semantic Intent.

We don't just inject data; we inject **Vision**. The "Soul" of the application lives in the **Tokens**.

### Rebranding the "Sage" Theme to "Terra"
To avoid naming collisions with the product itself ("Sage UI"), and to properly capture the specific aesthetic, the default organic theme will be renamed to **Terra**.

*   **Terra (formerly Sage):** Earthy, organic, warm, feminine. Colors: Deep greens, soft clays, warm creams. Type: Humanist sans-serifs.
*   **Volt:** Electric, technical, high-energy, masculine/neutral. Colors: Neons, deep blacks, sharp contrasts. Type: Monospaced or Geometric.
*   **Studio:** Neutral, professional, clean, invisible.

**How Personality Survives Automation:**
Because the Archetype relies on *semantic* tokens (e.g., `primary-color`, `border-radius-lg`, `font-display`), switching from **Terra** to **Volt** completely changes the emotional feel of the *same* data structure. We are not automating *style*; we are automating *layout*.

---

## 5. Naming & Brand Identity

### Domain: `thesage.dev`
This domain is excellent. It positions the product not just as a tool ("Sage UI") but as an entity or guide ("The Sage").
*   **Relevance:** Whether it's called "Sage UI", "Sage Design Engine", or "Sage Stack", `thesage.dev` remains the perfect home. It implies wisdom, guidance, and a comprehensive ecosystem.

---

## 6. Strategic Questions to Answer

1.  **The "Props" Limit:** How flexible should an Archetype be?
    *   *Risk:* If 100 props are needed, it becomes a burden.
    *   *Proposed Approach:* The "80/20 Rule." Archetypes handle 80% of use cases perfectly with zero config. For the 20%, allow "Slot" injection (passing custom React components into specific zones).

2.  **MCP Integration:** How deeply do we bake this into the standard workflow?
    *   *Idea:* A specific MCP tool `generate_page_config` that takes a user prompt and returns the JSON payload for a specific Archetype.

3.  **Pattern Library Strategy:**
    *   We need to identify the first 3-5 high-value **Patterns** that fit into these Archetypes.
    *   *Candidates:* `FeatureGrid` (marketing), `ResourceList` (docs), `MetricCards` (dashboard).

---

## 7. Immediate Roadmap

1.  **Formalize the Rename:** [COMPLETED] Execute "Sage Theme" -> "Terra Theme" in the codebase.
2.  **Ecosystem-Wide Branding:** [COMPLETED] Rename "Sage UI" -> "Sage Design Engine" and implement `BRAND` token.
3.  **Refine Archetypes:** [COMPLETED] Audit `SectionOverview` to ensure it accepts a pure data object prop alongside standard props.
3.  **Docs Update:** Ensure the documentation reflects this new "Engine" philosophy, perhaps updating the "Philosophy" or "Introduction" page to explain the separation of Content (Data) vs. Soul (Theme).
