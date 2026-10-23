/**
 * Which Reddit surface we're on. This matters a lot: old.reddit.com is
 * plain, light-DOM HTML (fully stylable by an injected stylesheet).
 * www.reddit.com ("shreddit") renders most of its UI inside Shadow DOM
 * custom elements (<shreddit-post>, <shreddit-comment-tree>, etc.), whose
 * internals are NOT reachable by an external content-script stylesheet —
 * that's a platform-level encapsulation boundary, not a bug to work
 * around with more specific CSS. See docs/extension-reddit-notes.md.
 */
export type RedditSite = 'old' | 'new' | 'unsupported'

export function detectSite(hostname: string): RedditSite {
  if (hostname === 'old.reddit.com') return 'old'
  if (hostname === 'www.reddit.com' || hostname === 'reddit.com') return 'new'
  return 'unsupported'
}
