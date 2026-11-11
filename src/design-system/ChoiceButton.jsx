import { Button } from './Action.jsx'

export default function ChoiceButton({ selected, className, ...props }) {
  return (
    <Button
      {...props}
      variant="plain"
      className={selected ? `${className} active` : className}
      aria-pressed={selected}
    />
  )
}
