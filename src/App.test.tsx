import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the project name and discovery-phase badge', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { name: /frutiger aero lab/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/discovery phase/i)).toBeInTheDocument()
  })

  it('links out to the GitHub repository', () => {
    render(<App />)

    const repoLink = screen.getByRole('link', { name: /view on github/i })
    expect(repoLink).toHaveAttribute(
      'href',
      'https://github.com/raunaksachinkhanna/frutiger-aero-lab',
    )
  })
})
