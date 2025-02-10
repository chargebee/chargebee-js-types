# Chargebee.js Types

This package contains type definitions for [Chargebee JS browser SDK](https://js.chargebee.com/v2/chargebee.js). If your are looking for Chargebee.js components head to [framework wrappers](https://github.com/chargebee/chargebee-js-wrappers).

### Install

`npm install --save-dev @chargebee/chargebee-js-types`

### Setup Pre-commit Hooks
Install pre-commit framework in developer machine
```
brew install pre-commit
npm run precommit
```

### Add Typing to window.Chargebee

To have the `Chargebee` object properly typed, add the following global type definition, such as in `global.d.ts`:

```typescript
import Chargebee from "@chargebee/chargebee-js-types"

declare global {
	var Chargebee: Chargebee
}
```

## Support
Have any queries regarding the implementation? Reach out to [support@chargebee.com](mailto:support@chargebee.com)
