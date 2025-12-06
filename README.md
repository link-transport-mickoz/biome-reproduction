# Biome bug reproduction

## Steps

1. `pnpm install`
2. `pnpm biome lint`

It will hang now. CPU usage will spike to 100% and nothing will happen until memory runs out.

Problematic file is `queue.ts`.

If you move `Node` class to separate file, biome will complain about "unusually large amount of types", but will otherwise run successfully.