import { elt } from '../dom'

export default function Input ({ className, ...props }) {
  return elt('input', {
    className: `form-input ${className || ''}`.trim(),
    ...props
  })
}
