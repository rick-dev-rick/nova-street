export default function Feedback({ tone, className, as: Element = 'p', ...props }) {
  return (
    <Element
      {...props}
      role={tone === 'error' ? 'alert' : tone === 'success' ? 'status' : undefined}
      className={className ? `${className} feedback` : 'feedback'}
      data-feedback={tone}
    />
  )
}
