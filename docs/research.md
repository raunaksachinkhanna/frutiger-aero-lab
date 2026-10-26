# Research & discovery

This document tracks what we learn while figuring out what Frutiger Aero
Lab should actually build. It is intentionally sparse right now — no
research results, user counts, or feedback are recorded here yet. This file
exists so that findings have a clear home as they come in, and so the
process stays honest: nothing below is invented.

## Why this comes before a product

Frutiger Aero (the Windows Vista/7-era aesthetic of glossy glass, saturated
blue/green, and optimistic "tech future" design) has an active nostalgia
community, but a nostalgic aesthetic is not itself a product. Before writing
real features, the goal is to find a genuine, recurring need that this
aesthetic and this project are well-positioned to solve — rather than
shipping a generic skin over something that already exists.

## Open questions

- What do people who are nostalgic for this era actually want to _use_,
  day to day — not just look at?
- Is there a tool, widget, or small utility people wish still existed from
  that era, in a modern, accessible form?
- Does the audience skew toward wanting a visual/aesthetic product (themes,
  wallpapers, UI kits) or a functional one (a utility with this skin)?

## How feedback will be gathered

- Community discussion (e.g. relevant subreddits and Discord communities
  focused on Frutiger Aero / Y2K design nostalgia).
- Direct feedback via [GitHub issues](../../issues) on this repository.

## Log

**2026-10-24 — Direction chosen: AeroReddit.** The maintainer decided to
proceed with a Reddit-theming browser extension (AeroReddit) as the first
product direction, rather than continuing open-ended discovery. This was a
maintainer decision based on enthusiasm for the concept, not a documented
round of community feedback — no subreddit/Discord outreach has happened
yet.

**2026-10-26 — AeroReddit cancelled; AeroFox is now the sole product.**
The maintainer decided to drop AeroReddit entirely (not just deprioritize
it) and focus exclusively on AeroFox, a native Firefox browser theme.
`apps/extension`, `apps/demo-site`, and the now-unused
`packages/aero-theme` shared theme package were removed from the repo.
Community feedback gathering (the original plan for this phase) is still
open and tracked in `roadmap.md`; findings from it will be logged here as
they come in.
