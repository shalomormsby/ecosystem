# Quick Resume: Sage UI Documentation Audit

**Use this prompt to resume work on the documentation audit with full context:**

---

I need you to continue implementing fixes from the Sage UI Documentation Audit.

**CRITICAL CONTEXT:**
1. Read the complete audit: `/Users/shalomormsby/Developer/work/ecosystem/apps/web/docs/SAGE-UI-AUDIT.md`
2. The audit found that `@thesage/ui` and `@thesage/mcp` are NOT published to npm (404 errors), making current installation docs impossible to follow
3. Component counts are wrong - docs claim "48 components" but reality is 60+ exported, only 36 in MCP registry
4. Missing critical setup steps: prerequisites, peer dependencies, Tailwind config
5. This is a monorepo at `/Users/shalomormsby/Developer/work/ecosystem`

**YOUR TASK:**
Work through the "Implementation Checklist" in the audit document sequentially. Start with Phase 0 (Critical Blockers) unless directed otherwise.

**Before making any changes:**
1. Read the specific issue description in the audit
2. Verify the problem by checking the actual code files (paths provided)
3. Review the "Solution" section for the recommended fix
4. Cross-reference with the codebase to ensure your fix matches reality

**After each fix:**
1. Check off the item in the Implementation Checklist
2. Test that the fix works (read the result, verify links, etc.)
3. Update any related documentation
4. Tell me what you completed and what's next

**IMPORTANT RULES:**
- Use the codebase as source of truth, not the documentation
- Don't make assumptions - verify component counts, package names, file paths
- Follow the phasing - complete Phase 0 before moving to Phase 1
- Update the checklist in SAGE-UI-AUDIT.md as you work
- Ask for clarification if something in the audit is unclear

**START HERE:**
[Tell me which phase/issue you want to work on, or say "start from the beginning"]

---

## Quick Reference

**Audit Location:** `apps/web/docs/SAGE-UI-AUDIT.md`

**Phase Overview:**
- **Phase 0 (Critical Blockers):** Package publication, component counts, prerequisites - MUST DO FIRST
- **Phase 1 (Pre-External Review):** ThemeProvider docs, motion system, MCP fixes - Before showing to Teg
- **Phase 2 (Important Improvements):** Tailwind config, troubleshooting, content gaps - Soon after
- **Phase 3 (Polish):** Consistency, completeness, nice-to-haves - When time permits

**Key Files to Update:**
- Getting Started: `apps/web/app/components/studio/OverviewSection.tsx`
- MCP Section: `apps/web/app/components/studio/McpSection/*.tsx`
- MCP Registry: `packages/sds-mcp-server/src/registry.ts`
- Package Configs: `packages/ui/package.json`, `packages/sds-mcp-server/package.json`

**Verification Commands:**
```bash
# Count components by category
for dir in actions forms navigation overlays feedback data-display layout; do
  echo "$dir: $(ls packages/ui/src/components/$dir/*.tsx 2>/dev/null | wc -l)"
done

# Check package on npm
npm view @thesage/ui

# Count MCP registry entries
grep -c "^  [a-z].*: {$" packages/sds-mcp-server/src/registry.ts
```

---

**Last Updated:** January 26, 2026
