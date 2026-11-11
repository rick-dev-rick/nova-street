export default function Dialog({ ref, onDismiss, ...props }) {
  function dismissFromBackdrop(event) {
    if (event.target !== event.currentTarget) return
    const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect()
    const outside = event.clientX < left || event.clientX >= right ||
      event.clientY < top || event.clientY >= bottom
    if (outside) onDismiss()
  }

  return <dialog {...props} ref={ref} onClick={dismissFromBackdrop} />
}
