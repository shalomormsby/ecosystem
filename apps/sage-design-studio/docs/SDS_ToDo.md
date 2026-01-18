# Sage Design System - To Do

This document tracks planned improvements and enhancements to the Sage Design System.

---

## Motion Intensity Slider - Make Fully Functional
**Date Added:** 2026-01-16
**Priority:** High
**Effort:** Medium (3-5 days)
**Impact:** High

### Current State
The Motion Intensity slider in the Customizer **partially works** - it updates the store but doesn't affect most animations in the app.

**What's Working:**
- Slider updates the customizer store correctly
- Infrastructure exists (`useMotionPreference` hook is well-designed)
- One component uses it (`VariableWeightText` properly scales animations)

**The Problem:**
Out of **43 files using framer-motion**, only **1 component** respects the motion intensity setting. All other animated components ignore it.

### Original Intent
The motion intensity slider was designed to:
- **Scale animation speed**: Higher intensity = faster/more energetic animations
- **Disable animations**: Setting to 0 completely stops motion
- **Respect accessibility**: Automatically syncs with system `prefers-reduced-motion` preference
- **Provide granular control**: 11 levels (0-10) for fine-tuning motion comfort

The `useMotionPreference` hook provides:
- `shouldAnimate` - Boolean to conditionally render animations
- `scale` - Number (0-10) to scale duration/intensity
- `prefersReducedMotion` - System preference awareness

### Implementation Plan

**What needs to be done:**
1. Audit all components using `motion.` from framer-motion
2. Add `useMotionPreference` hook to each animated component
3. Wrap animations in `shouldAnimate` conditionals
4. Scale duration using: `duration * (scale / 10)`
5. Provide static fallbacks when `shouldAnimate === false`

**Example transformation:**
```tsx
// BEFORE (ignores motion preference)
<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>

// AFTER (respects motion preference)
const { shouldAnimate, scale } = useMotionPreference();

{shouldAnimate ? (
  <motion.div
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 * (scale / 10) }}
  >
) : (
  <div style={{ opacity: 1 }}>
)}
```

**Complexity factors:**
- ✅ Hook already exists and is well-designed
- ✅ Pattern established in `VariableWeightText` to follow
- ⚠️ 43 files to update (but most have simple animations)
- ⚠️ Need to test each component's static fallback
- ⚠️ Some complex animations may need custom scaling logic

### Impact
**User Experience Benefits:**
- ✨ **Accessibility compliance** - Critical for users with vestibular disorders
- ✨ **User preference** - Some users simply prefer less motion
- ✨ **Performance** - Users on slower devices can reduce motion overhead
- ✨ **Brand polish** - Shows attention to detail and inclusive design

**Current Consequences:**
- ❌ Slider appears broken (misleading UX)
- ❌ Users with motion sensitivity have no recourse except OS-level settings
- ❌ Violates the principle of user control established by having the slider

### Additional UI Fix Needed
**Slider Background Contrast**: The slider background needs increased contrast, especially in the Volt theme. Currently difficult to see the track/rail.

### References
- [customizer.ts:5-23](../../packages/ui/src/lib/store/customizer.ts#L5-L23) - Store implementation
- [useMotionPreference.ts](../../packages/ui/src/hooks/useMotionPreference.ts) - Motion preference hook
- [VariableWeightText.tsx:68-76](../../packages/ui/src/components/data-display/VariableWeightText.tsx#L68-L76) - Working example
- [CustomizerPanel.tsx:68-84](../../packages/ui/src/components/layout/CustomizerPanel.tsx#L68-L84) - Slider UI

---


## Motion Section Evolution
**Date Added:** 2026-01-17
**Status:** To Do

High-impact tasks to evolve the SDS Motion section and make it as useful as possible.

- [ ] **Fill the "Placeholders"**
    - [x] **DurationPage & EasingPage**: Critical foundation primitives. Users need to feel the difference. (Impact: High)
    - **TypewriterPage**: A classic effect. (Impact: Medium)
    - **MagneticPage**: Great for micro-interactions. (Impact: High)
- [ ] **Standardize "Motion Primitives"**
    - Create a `Motion` namespace in `@sds/ui` (e.g., `<Motion.Fade in>`). Reduces boilerplate. (Impact: High)
- [ ] **"Playground" for Motion Tokens**
    - Build a page where users can tweak variables and see real-time effects on dummy UI. (Impact: High)
- [ ] **Accessibility First (Reduced Motion)**
    - Audit all motion components. If `prefers-reduced-motion` is true, automatically simplify or disable. (Impact: Critical)
- [ ] **Add "Page Transitions"**
    - Create a standard `<PageTransition>` component for seamless navigation. (Impact: High)
- [ ] **Interactive "Scroll" Components**
    - Add `ScrollReveal` or `Parallax` components. (Impact: High)
