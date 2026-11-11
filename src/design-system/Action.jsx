import { Link } from 'react-router-dom'

const variants = {
  primary: 'btn btn-primary',
  secondary: 'btn btn-secondary',
  text: 'text-link',
  plain: '',
}

export function Button({ variant = 'primary', className, type = 'button', ...props }) {
  return <button {...props} type={type} className={[variants[variant], className].filter(Boolean).join(' ')} />
}

export function ActionLink({ variant = 'primary', className, ...props }) {
  return <Link {...props} className={[variants[variant], className].filter(Boolean).join(' ')} />
}
