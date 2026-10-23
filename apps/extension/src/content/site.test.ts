import { describe, expect, it } from 'vitest'
import { detectSite } from './site'

describe('detectSite', () => {
  it('recognizes old.reddit.com', () => {
    expect(detectSite('old.reddit.com')).toBe('old')
  })

  it('recognizes www.reddit.com and bare reddit.com', () => {
    expect(detectSite('www.reddit.com')).toBe('new')
    expect(detectSite('reddit.com')).toBe('new')
  })

  it('treats anything else as unsupported', () => {
    expect(detectSite('reddit.com.evil.example')).toBe('unsupported')
    expect(detectSite('example.com')).toBe('unsupported')
  })
})
