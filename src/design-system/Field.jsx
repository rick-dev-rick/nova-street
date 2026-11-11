export function InputField({ label, className, ...props }) {
  return <label className={className}><span>{label}</span><input {...props} /></label>
}

export function SelectField({ label, className, children, ...props }) {
  return <label className={className}><span>{label}</span><select {...props}>{children}</select></label>
}
