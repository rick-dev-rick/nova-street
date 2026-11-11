import { useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../design-system/Action.jsx'

const categories = [
  { label: 'Novidades', value: null },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Unissex', value: 'Unissex' },
  { label: 'Acessórios', value: 'Acessórios' },
]

export default function CategoryNavigation() {
  const location = useLocation()
  const navId = useId()
  const toggle = useRef(null)
  const [open, setOpen] = useState(false)
  const category = new URLSearchParams(location.search).get('categoria')

  useEffect(() => { setOpen(false) }, [location.key])

  function close() {
    setOpen(false)
    toggle.current.focus()
  }

  function onKeyDown(event) {
    if (open && event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  }

  return (
    <>
      <Button
        ref={toggle}
        variant="secondary"
        className="category-menu-toggle"
        aria-controls={navId}
        aria-expanded={open}
        onClick={() => setOpen(value => !value)}
        onKeyDown={onKeyDown}
      >
        Menu
      </Button>
      <nav id={navId} className="main-nav" aria-label="Navegação principal" data-expanded={open} onKeyDown={onKeyDown}>
        {categories.map(({ label, value }) => (
          <Link
            key={label}
            to={value ? `/catalogo?categoria=${encodeURIComponent(value)}` : '/catalogo'}
            aria-current={location.pathname === '/catalogo' && category === value ? 'page' : undefined}
            onClick={event => {
              if (open && event.button === 0 && !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) close()
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  )
}
