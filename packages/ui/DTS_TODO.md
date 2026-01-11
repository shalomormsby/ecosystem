# TypeScript Declaration Files (DTS) - TODO

## Status: Temporarily Disabled

TypeScript declaration file generation has been temporarily disabled to unblock Vercel deployments.

## Issue

The build was failing on Vercel with:
```
Error: error occurred in dts build
DTS Build error
```

This error occurs during tsup's DTS generation step and only happens in Vercel's environment, not locally.

## What Changed

- `tsup.config.ts`: Set `dts: false`
- `package.json`: Removed `--dts` flag from build script
- `package.json`: Removed `"types": "dist/index.d.ts"` field

## Impact

- The package still builds successfully (ESM + CJS)
- Runtime functionality is unaffected
- TypeScript consumers may have reduced IDE autocomplete/type checking
- The package is still usable, just without type definitions

## Root Cause Investigation Needed

Likely causes:
1. **react-hook-form types** - Form.tsx imports may be problematic
2. **@tanstack/react-table types** - DataTable.tsx imports may be problematic
3. **TypeScript version mismatch** - Vercel may use different TS version than local
4. **Workspace path resolution** - `@sds/tokens` path mapping may not work on Vercel

## How to Fix (Later)

1. Try generating DTS with `tsc` directly instead of tsup:
   ```json
   "build": "tsup src/index.ts --format esm,cjs && tsc --emitDeclarationOnly"
   ```

2. Or use tsup with more permissive settings:
   ```typescript
   dts: {
     resolve: true,
     compilerOptions: {
       skipLibCheck: true,
     }
   }
   ```

3. Or investigate which specific component is causing the DTS issue by temporarily removing components one by one

## Timeline

- **Jan 11, 2026**: Disabled to unblock Vercel builds after 8+ failed attempts
- Commit: c7964cb was last known working state (but DTS might have been broken even then)
