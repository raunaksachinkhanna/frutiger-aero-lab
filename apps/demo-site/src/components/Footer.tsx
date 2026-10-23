const REPO_URL = 'https://github.com/raunaksachinkhanna/frutiger-aero-lab'

export function Footer() {
  return (
    <footer className="demo-footer">
      <p>
        Part of{' '}
        <a href={`${REPO_URL}`} target="_blank" rel="noreferrer">
          Frutiger Aero Lab
        </a>
        . Open source, MIT licensed.{' '}
        <a href={`${REPO_URL}/issues`} target="_blank" rel="noreferrer">
          Report an issue
        </a>
        .
      </p>
    </footer>
  )
}
