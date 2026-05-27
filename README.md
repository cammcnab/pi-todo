# pi-todo

A Pi extension that adds a `todo` tool and a `/todo` TUI dashboard, synced with the **pi** list in Apple Reminders.

Uses AppleScript (JXA) under the hood — no Swift helper, no compiled binaries, no TCC dance. macOS prompts once for Automation access to Reminders.app the first time it runs, and that's it.

> Forked from [@patriceckhart/pi-todo](https://www.npmjs.com/package/@patriceckhart/pi-todo) (MIT). Same tool surface and TUI; the EventKit-based Swift helper has been replaced with `osascript -l JavaScript`.

## Install

In a terminal:

```bash
pi install https://github.com/cammcnab/pi-todo
```

Or paste in Pi:

```
Install this extension: https://github.com/cammcnab/pi-todo
```

Then `/reload` (or restart Pi) and you should see `todo` in the tool list.

The first time you call `todo` or open `/todo`, macOS will ask whether your terminal app (e.g. cmux, Ghostty, Terminal.app) may control Reminders. Click **OK**.

## Usage

### LLM tool

The `todo` tool exposes six actions:

| Action  | Required             | Optional                                |
| ------- | -------------------- | --------------------------------------- |
| `list`  | —                    | —                                       |
| `add`   | `title`              | `body`, `priority` (none/low/medium/high) |
| `toggle`| `id`                 | —                                       |
| `edit`  | `id`                 | `title`, `body`, `priority`             |
| `remove`| `id`                 | —                                       |
| `clear` | —                    | —                                       |

`id` values are Apple Reminder external IDs (e.g. `x-apple-reminder://…`).

### `/todo` command

Opens a TUI list view. Keys:

- `↑/↓` / `j/k` — navigate
- `Enter` — open detail
- `Space` / `x` — toggle complete
- `a` — add a new todo (title → optional description)
- `e` — edit description (in detail view)
- `d` / `Backspace` — delete
- `r` — refresh from Reminders
- `Esc` / `q` — back / close

## Why a fork

`@patriceckhart/pi-todo` ships a Swift helper that links EventKit. Under macOS hardened runtime, that path only works when the **responsible parent process** (your terminal) has `com.apple.security.personal-information.calendars` in its Info.plist. Many modern terminals (cmux, some Ghostty builds, etc.) don't — so TCC silently denies access without ever surfacing a prompt.

AppleScript / JXA goes through the **Automation** entitlement (`NSAppleEventsUsageDescription`) instead, which the same terminals do declare. macOS shows a single Allow/Deny prompt the first time, and from there it just works.

## Source

- Original package: https://github.com/patriceckhart/pi-todo
- This fork: https://github.com/cammcnab/pi-todo

## License

MIT — see [LICENSE](./LICENSE). Includes attribution to the upstream package.
