/**
 * Shared radiogroup renderer for the popup's pill buttons and the
 * options page's larger cards — same roving-tabindex + arrow-key
 * behavior (WAI-ARIA Authoring Practices for a radiogroup), different
 * per-item visuals supplied by the caller via renderItem.
 */

const NEXT_KEYS = new Set(['ArrowDown', 'ArrowRight'])
const PREVIOUS_KEYS = new Set(['ArrowUp', 'ArrowLeft'])

export function stepIndex(current, length, delta) {
  return (current + delta + length) % length
}

export function renderThemePicker(container, { ids, selectedId, onSelect, renderItem }) {
  const hadFocus = container.contains(document.activeElement)
  container.innerHTML = ''

  const buttons = ids.map((id, index) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.role = 'radio'
    const isSelected = id === selectedId
    button.setAttribute('aria-checked', String(isSelected))
    button.dataset.selected = String(isSelected)
    button.tabIndex = isSelected ? 0 : -1
    renderItem(button, id)
    button.addEventListener('click', () => onSelect(id))
    button.addEventListener('keydown', (event) => {
      let delta = 0
      if (NEXT_KEYS.has(event.key)) delta = 1
      else if (PREVIOUS_KEYS.has(event.key)) delta = -1
      else return
      event.preventDefault()
      const nextIndex = stepIndex(index, ids.length, delta)
      buttons[nextIndex]?.focus()
      onSelect(ids[nextIndex])
    })
    return button
  })

  buttons.forEach((button) => container.appendChild(button))

  if (hadFocus) {
    buttons[ids.indexOf(selectedId)]?.focus()
  }
}
