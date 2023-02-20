# Chargebee.js Types

Type definitions for Chargebee JS SDK.

### Install

`npm install --save-dev @chargebee/chargebee-js-types`

### Add Typing to window.Chargebee

To have the `Chargebee` object properly typed, add the following global type definition, such as in `global.d.ts`:

```typescript
import { Chargebee } from "@chargebee/chargebee-js-types"

declare global {
	var Chargebee: Chargebee
}
```
