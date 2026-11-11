import { useId } from 'react'

export function InputField({ label, className, error, ...props }) {
  const id = useId()
  const labelId = `${id}-label`
  const errorId = `${id}-error`
  const describedBy = [props['aria-describedby'], error && errorId].filter(Boolean).join(' ')
  return (
    <label className={className}>
      <span id={labelId}>{label}</span>
      <input {...props} aria-labelledby={props['aria-labelledby'] ?? labelId} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={describedBy || undefined} />
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </label>
  )
}

export function SelectField({ label, className, children, ...props }) {
  return <label className={className}><span>{label}</span><select {...props}>{children}</select></label>
}
