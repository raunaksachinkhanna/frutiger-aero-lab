import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the AeroReddit hero and sample-data disclosure', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /aeroreddit/i, level: 1 }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/sample content|sample data/i).length).toBeGreaterThan(0)
  })

  it('switches theme via the theme switcher', async () => {
    const user = userEvent.setup()
    render(<App />)

    const darkAeroButton = screen.getByRole('radio', { name: /dark aero/i })
    await user.click(darkAeroButton)

    expect(darkAeroButton).toHaveAttribute('aria-checked', 'true')
  })

  it('renders fictional sample posts, not real Reddit content', () => {
    render(<App />)
    expect(
      screen.getAllByText(/found my old vista install disc/i).length,
    ).toBeGreaterThan(0)
  })
})
