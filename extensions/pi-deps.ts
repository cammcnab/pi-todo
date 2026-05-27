/**
 * Runtime shim that resolves Pi's core packages under either the legacy
 * `@mariozechner/*` scope (Pi ≤ 0.74) or the new `@earendil-works/*` scope
 * (Pi ≥ 0.75). Lets this extension load on either Pi version.
 */

async function loadFirst<T = any>(specifiers: string[]): Promise<T> {
  let lastErr: unknown;
  for (const spec of specifiers) {
    try {
      return (await import(spec)) as T;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr ?? new Error(`Could not resolve any of: ${specifiers.join(", ")}`);
}

const codingAgent = await loadFirst<any>([
  "@earendil-works/pi-coding-agent",
  "@mariozechner/pi-coding-agent",
]);

const tui = await loadFirst<any>([
  "@earendil-works/pi-tui",
  "@mariozechner/pi-tui",
]);

// pi-coding-agent
export const DynamicBorder = codingAgent.DynamicBorder;

// pi-tui
export const Container = tui.Container;
export const SelectList = tui.SelectList;
export const Editor = tui.Editor;
export const Key = tui.Key;
export const matchesKey = tui.matchesKey;
export const Text = tui.Text;
export const truncateToWidth = tui.truncateToWidth;

// pi-ai (StringEnum helper)
const ai = await loadFirst<any>([
  "@earendil-works/pi-ai",
  "@mariozechner/pi-ai",
]);
export const StringEnum = ai.StringEnum;

// typebox
const tb = await loadFirst<any>(["@sinclair/typebox"]);
export const Type = tb.Type;

// Types are erased at runtime; expose loose `any` aliases so consumers keep
// type-checking shape without needing the scoped types to resolve at compile
// time across Pi versions.
export type ExtensionAPI = any;
export type SelectItem = any;
export type Theme = any;
export type EditorTheme = any;
