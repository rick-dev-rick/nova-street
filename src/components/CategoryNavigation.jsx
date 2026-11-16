import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../design-system/Action.jsx'
import Dialog from '../design-system/Dialog.jsx'
import BrandWordmark from '../design-system/BrandWordmark.jsx'
import '../styles/fullscreen-menu.css'

const categories = [
  { label: 'Novidades', value: null },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Unissex', value: 'Unissex' },
  { label: 'Acessórios', value: 'Acessórios' },
]

function categoryDestination(value) {
  return value ? `/catalogo?categoria=${encodeURIComponent(value)}` : '/catalogo'
}

export default function CategoryNavigation({ onOpenCart, cartCount }) {
  const location = useLocation()
  const navId = useId()
  const trigger = useRef(null)
  const dialog = useRef(null)
  const dismissButton = useRef(null)
  const firstLink = useRef(null)
  const lastButton = useRef(null)
  const closeTimer = useRef(null)
  const pressedLink = useRef(null)
  const [open, setOpen] = useState(false)
  const category = new URLSearchParams(location.search).get('categoria')

  const finishClose = useCallback(() => {
    window.clearTimeout(closeTimer.current)
    const panel = dialog.current
    if (!panel?.open) return
    panel.removeAttribute('data-closing')
    panel.firstElementChild.inert = false
    pressedLink.current?.removeAttribute('data-menu-pressed')
    pressedLink.current = null
    panel.close()
    setOpen(false)
    trigger.current.focus({ preventScroll: true })
  }, [])

  useEffect(() => { finishClose() }, [location.key, finishClose])
  useEffect(() => () => window.clearTimeout(closeTimer.current), [])

  function show() {
    dialog.current.showModal()
    setOpen(true)
    dismissButton.current.focus({ preventScroll: true })
  }

  function close() {
    const panel = dialog.current
    if (!panel.open) return
    if (panel.hasAttribute('data-closing') || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finishClose()
      return
    }
    setOpen(false)
    panel.setAttribute('data-closing', '')
    panel.firstElementChild.inert = true
    // Backup if the animation is interrupted or overridden.
    closeTimer.current = window.setTimeout(finishClose, 200)
  }

  function followLink(event) {
    if (event.button === 0 && !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey) {
      finishClose()
    }
  }

  function openCartFromMenu() {
    finishClose()
    onOpenCart()
  }

  function releasePress() {
    pressedLink.current?.removeAttribute('data-menu-pressed')
    pressedLink.current = null
  }

  function markPress(event) {
    if (!event.isPrimary || event.pointerType === 'mouse') return
    releasePress()
    pressedLink.current = event.target.closest('a')
    pressedLink.current?.setAttribute('data-menu-pressed', '')
  }

  function loopTab(event) {
    if (event.key !== 'Tab' || dialog.current.hasAttribute('data-closing')) return
    const edge = event.shiftKey ? firstLink.current : lastButton.current
    if (event.target !== edge) return
    event.preventDefault()
    const otherEdge = event.shiftKey ? lastButton.current : firstLink.current
    otherEdge.focus()
  }

  function current(value) {
    return location.pathname === '/catalogo' && category === value ? 'page' : undefined
  }

  return (
    <>
      <nav className="main-nav" aria-label="Navegação principal">
        {categories.map(({ label, value }) => (
          <Link key={label} to={categoryDestination(value)} aria-current={current(value)}>{label}</Link>
        ))}
      </nav>
      <Button
        ref={trigger}
        variant="secondary"
        className="category-menu-toggle"
        aria-haspopup="dialog"
        aria-controls={navId}
        aria-expanded={open}
        onClick={show}
      >
        Menu
      </Button>
      <Dialog
        ref={dialog}
        id={navId}
        className="cinematic-menu"
        data-nova-theme="dark"
        aria-label="Menu NØVA STREET"
        onDismiss={close}
        onKeyDown={loopTab}
        onAnimationEnd={event => {
          if (event.target === event.currentTarget.firstElementChild && event.animationName === 'nova-menu-exit-curtain') finishClose()
        }}
        onCancel={event => {
          event.preventDefault()
          close()
        }}
      >
        <div className="cinematic-menu-shell">
          <div className="cinematic-menu-header">
            <Link ref={firstLink} className="brand" to="/" onClick={followLink} aria-label="NØVA STREET início">
              <BrandWordmark />
            </Link>
            <Button ref={dismissButton} className="cinematic-menu-close" variant="secondary" onClick={close}>
              Fechar <span aria-hidden="true">×</span>
            </Button>
          </div>
          <nav
            className="cinematic-menu-nav"
            aria-label="Categorias"
            onPointerDown={markPress}
            onPointerUp={releasePress}
            onPointerCancel={releasePress}
            onLostPointerCapture={releasePress}
          >
            <ul>
              {categories.map(({ label, value }, index) => (
                <li key={label} style={{ '--menu-order': index }}>
                  <Link to={categoryDestination(value)} aria-current={current(value)} onClick={followLink}>
                    <span className="cinematic-menu-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    <span className="cinematic-menu-mask"><span>{label}</span></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="cinematic-menu-actions">
            <Link to="/favoritos" onClick={followLink}>Favoritos</Link>
            <button ref={lastButton} type="button" onClick={openCartFromMenu} aria-label={`Abrir sacola com ${cartCount} itens`}>
              Sacola <span aria-hidden="true">{cartCount}</span>
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}
