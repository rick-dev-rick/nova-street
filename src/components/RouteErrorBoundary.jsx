import { Component } from 'react'
import { Button } from '../design-system/Action.jsx'
import Feedback from '../design-system/Feedback.jsx'

export default class RouteErrorBoundary extends Component {
  state = { failed: false, pathname: null }

  static getDerivedStateFromProps({ pathname }, state) {
    return pathname === state.pathname ? null : { pathname, failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section className="section container empty-state">
        <h1>Página indisponível</h1>
        <Feedback tone="error">Não foi possível carregar esta página.</Feedback>
        <Button onClick={() => window.location.reload()}>Recarregar página</Button>
      </section>
    )
  }
}
