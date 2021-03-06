![alt text](https://i.ibb.co/JCpbbB8/Screen-Shot-2022-06-29-at-6-41-31-PM.png)

# Open Graph Tag Generator

- Application that dynamically generates Open Graph keys using information derived from custom meta keys.

## Project Details

- User has option to select from a list of supported open graph keys and set a custom value for each one.
- Form submission parsed to create meta tags.
- Optimized Open Graph tags required by protocol are dynamically generated from meta information without having to be explicitly set, ensuring that best practices are being met.
- Value set for all required open graph tags will be derived from its meta counterpart or static placeholders, unless a custom value is set for it.
- Preview closely resembling final graph object will be created when submission is received.
- External package leveraged to display tags in block format and to allow code to be copied to clipboard.
- Static typing applied to all custom components, state, and utility functions.
- Unit tests written using Jest to simulate all scenarios relevant to tag composition and how form submission is parsed.

## Toolbox

- React (Hooks)
- TypeScript
- Jest

## Live Demo

[CodeSandbox](https://codesandbox.io/s/github/jordanutz/open-graph-protocol)
