/**
 * Entirely fictional sample content for the AeroReddit demo. None of this
 * is real Reddit data — no real usernames, posts, or subreddits. It exists
 * only to show what AeroReddit's theming looks like applied to a
 * Reddit-shaped feed.
 */
export interface SamplePost {
  id: string
  subreddit: string
  author: string
  title: string
  body: string
  score: number
  comments: number
  timeAgo: string
}

export const SAMPLE_POSTS: SamplePost[] = [
  {
    id: 'p1',
    subreddit: 'r/frutigeraero',
    author: 'u/aero_glass_fan',
    title: 'Found my old Vista install disc in a drawer today',
    body: 'Booted it up in a VM just to see the Aero Glass effect again. The water droplet wallpaper still goes hard.',
    score: 1842,
    comments: 213,
    timeAgo: '7h',
  },
  {
    id: 'p2',
    subreddit: 'r/webdesign',
    author: 'u/glossy_pixels',
    title: 'Bring back skeuomorphism, I am begging you',
    body: "Flat design was a phase. We deserve gradients, bevels, and buttons that look like they'd make a satisfying click sound.",
    score: 956,
    comments: 88,
    timeAgo: '11h',
  },
  {
    id: 'p3',
    subreddit: 'r/nostalgia',
    author: 'u/bubble_and_squeak',
    title: 'The optimism of 2007 tech design was unmatched',
    body: 'Everything looked like it was made of water and light. We were promised a future made of glass.',
    score: 2310,
    comments: 341,
    timeAgo: '1d',
  },
  {
    id: 'p4',
    subreddit: 'r/frutigeraero',
    author: 'u/turquoise_tide',
    title: "Rate my desktop: 'Dark Aero' theme recreation",
    body: 'Spent the weekend tweaking the glow. Still not sure the cyan is saturated enough.',
    score: 614,
    comments: 47,
    timeAgo: '14h',
  },
]

export interface SampleComment {
  id: string
  author: string
  body: string
  score: number
  timeAgo: string
  replies?: SampleComment[]
}

export const SAMPLE_COMMENTS: SampleComment[] = [
  {
    id: 'c1',
    author: 'u/misty_morning',
    body: 'The floating bubbles in the background of this theme are doing something to my brain. 10/10.',
    score: 312,
    timeAgo: '6h',
    replies: [
      {
        id: 'c1-1',
        author: 'u/aero_glass_fan',
        body: "Right?? It's the little animated details that sell it.",
        score: 88,
        timeAgo: '5h',
      },
    ],
  },
  {
    id: 'c2',
    author: 'u/glossy_pixels',
    body: 'Finally, a theme extension that respects reduced-motion settings. Thank you.',
    score: 201,
    timeAgo: '8h',
  },
  {
    id: 'c3',
    author: 'u/turquoise_tide',
    body: 'Is the accent color customizable? The default blue is great but I want mine more teal.',
    score: 54,
    timeAgo: '9h',
  },
]
