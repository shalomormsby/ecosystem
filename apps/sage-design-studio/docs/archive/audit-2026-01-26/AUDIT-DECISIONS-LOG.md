# Sage UI Documentation Audit - Decisions Log

**Purpose:** Track key decisions made during audit fix implementation. This ensures consistency and provides rationale for future maintainers.

**Date Started:** January 26, 2026
**Status:** 🟡 In Progress

---

## Critical Decisions Needed

### ✅ Decision #1: Package Distribution Strategy
**Status:** ⏳ NEEDS DECISION
**Priority:** P0 - Blocks Phase 0 implementation
**Decision Maker:** Shalom

**Question:** Should Sage UI packages be published to npm or remain monorepo-only?

**Options:**

**Option A: Publish to npm (Recommended for External Users)**
- ✅ Pros: Standard installation, easier adoption, professional perception
- ❌ Cons: Requires npm account setup, publishing workflow, versioning discipline
- **Effort:** 4-6 hours (setup + first publish)
- **Impact:** Documentation becomes simple: `pnpm add @sage/ui`

**Option B: Monorepo-Only (Recommended for Now)**
- ✅ Pros: No publishing overhead, faster iteration during development
- ❌ Cons: Higher barrier to entry, longer setup instructions
- **Effort:** 2-3 hours (document monorepo setup)
- **Impact:** Documentation must explain clone → install → build → link

**Recommendation:** Option B (Monorepo-Only) for now, with clear "npm packages coming soon" messaging. Publish to npm when:
1. Design system is stable (no breaking changes expected)
2. Documentation is complete
3. Automated publishing pipeline is set up

**Decision:** [PENDING - Awaiting Shalom's input]

**Date Decided:** [TBD]

**Rationale:** [TBD]

---

### Decision #2: Component Count Strategy
**Status:** ⏳ NEEDS DECISION
**Priority:** P0 - Blocks accurate documentation
**Decision Maker:** Shalom

**Question:** What components should be included in the "official" count?

**Current Reality:**
- **7 "Standard" Categories:** 81 files, 82 exports
  - actions (5), forms (18), navigation (10), overlays (11), feedback (6), data-display (16), layout (15)
- **Additional Categories:** 9+ components
  - backgrounds (2), blocks (multiple), cursor (2), motion (multiple)
- **Total Exported:** 90+ components from `packages/ui/src/index.ts`
- **MCP Registry:** Only 36 components

**Options:**

**Option A: Count Only "Standard" 7 Categories**
- Total: ~82 components
- Pro: Focuses on core design system
- Con: Ignores 10+ production components

**Option B: Count All Exported Components**
- Total: 90+ components
- Pro: Most accurate
- Con: Includes specialty components (backgrounds, motion effects)

**Option C: Count "Core" + Explicitly List "Specialty"**
- Document: "82 core components + 10 specialty components (backgrounds, motion, cursor effects)"
- Pro: Clear distinction, complete picture
- Con: More complex messaging

**Recommendation:** Option C - Clear distinction helps users understand scope

**Decision:** [PENDING - Awaiting Shalom's input]

**Date Decided:** [TBD]

**Rationale:** [TBD]

---

### Decision #3: MCP Component Coverage
**Status:** ⏳ NEEDS DECISION
**Priority:** P1 - Affects MCP functionality
**Decision Maker:** Shalom

**Question:** Should MCP registry include ALL components or a curated subset?

**Current State:**
- MCP Registry: 36 components
- Actual Exports: 90+ components
- Missing: 50+ components (including Text, Heading, Code, CollapsibleCodeBlock, SearchBar, etc.)

**Options:**

**Option A: All Exported Components**
- Pro: Complete discoverability
- Con: 4-6 hours to add metadata for all missing components
- Pro: AI can find any component user mentions

**Option B: Curated Core Components Only**
- Pro: Focus on most commonly used
- Con: Users can't discover specialty components via AI
- Pro: Less maintenance burden

**Option C: Gradual Addition**
- Start: Add top 20 most-used missing components
- Later: Add remainder as requested
- Pro: Balanced approach
- Con: Some components still undiscoverable

**Recommendation:** Option A - MCP's value is complete discoverability. 4-6 hour investment pays off.

**Decision:** [PENDING - Awaiting Shalom's input]

**Date Decided:** [TBD]

**Rationale:** [TBD]

---

### Decision #4: Documentation Structure
**Status:** ⏳ OPTIONAL DECISION
**Priority:** P2 - Affects long-term maintainability
**Decision Maker:** Shalom

**Question:** Should Getting Started remain one long page or be split into multiple pages?

**Current State:**
- OverviewSection.tsx: ~1,136 lines
- Contains: Welcome, Philosophy, Features, Quick Start, Documentation links
- All rendered on one scrollable page

**Options:**

**Option A: Keep Single Page**
- Pro: Easy to search (Cmd+F finds everything)
- Pro: No navigation required
- Con: Very long file, harder to maintain

**Option B: Split into Multiple Pages**
- Separate: /overview, /quick-start, /architecture, /philosophy
- Pro: Smaller files, easier to edit
- Con: More navigation, harder to scan all content

**Option C: Hybrid (Current + Dedicated Pages)**
- Keep overview page with summaries
- Add dedicated pages for deep dives
- Pro: Best of both worlds
- Con: Some duplication

**Recommendation:** Option A for now - single page is working well. Revisit if file exceeds 2,000 lines.

**Decision:** [PENDING - Low priority]

**Date Decided:** [TBD]

**Rationale:** [TBD]

---

## Decisions Made During Implementation

### ✅ [Decision Template - Copy for new decisions]

**Decision:** [Brief title]
**Date:** [YYYY-MM-DD]
**Decided By:** [Name]
**Issue:** [Which audit issue triggered this]

**Question:** [What needed to be decided]

**Options Considered:**
1. [Option A]
2. [Option B]
3. [Option C]

**Decision Made:** [Which option was chosen]

**Rationale:**
[Why this option was chosen over alternatives]

**Implementation Notes:**
[Any details about how this was implemented]

**Files Changed:**
- [File 1]
- [File 2]

**Impact:**
[How this decision affects the codebase/documentation]

---

## How to Use This Log

**When starting an issue fix:**
1. Check if there's a pending decision that blocks your work
2. If yes, flag it for Shalom's review
3. If no, proceed with implementation

**When making a decision during implementation:**
1. Copy the decision template above
2. Fill in all sections
3. Add to "Decisions Made During Implementation"
4. Update any affected documentation

**When reviewing this log:**
- Pending decisions should be resolved before proceeding to next phase
- Made decisions provide context for future changes
- If a decision needs revisiting, add a new entry (don't edit old ones)

---

**Last Updated:** January 26, 2026
**Next Review:** After each major phase completion
