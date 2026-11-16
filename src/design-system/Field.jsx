import { useId } from 'react'

export function InputField({ id: providedId, label, className, error, ...props }) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  const errorId = `${id}-error`
  const describedBy = [props['aria-describedby'], error && errorId].filter(Boolean).join(' ')
  return (
    <div className={['form-field', className].filter(Boolean).join(' ')}>
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id} aria-invalid={error ? true : props['aria-invalid']} aria-describedby={describedBy || undefined} />
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </div>
  )
}

export function SelectField({ id: providedId, label, className, children, ...props }) {
  const generatedId = useId()
  const id = providedId ?? generatedId
  return (
    <div className={['form-field', className].filter(Boolean).join(' ')}>
      <label htmlFor={id}>{label}</label>
      <select {...props} id={id}>{children}</select>
    </div>
  )
}
