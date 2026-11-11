import { useId } from 'react'

export default function EmptyState({ title, description, action, icon, eyebrow, headingLevel = 1 }) {
  const headingId = useId()
  const Heading = headingLevel === 2 ? 'h2' : 'h1'

  return (
    <section className={headingLevel === 2 ? 'empty-state empty-state-inline' : 'section container empty-state'} aria-labelledby={headingId}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {icon}
      <Heading id={headingId}>{title}</Heading>
      {description && <p>{description}</p>}
      {action}
    </section>
  )
}
