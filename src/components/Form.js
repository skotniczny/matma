import { elt } from '../dom'

export default function Form ({ className, ...props }, ...children) {
  return elt('form', {
    className: `form-container ${className || ''}`.trim(),
    ...props
  }, ...children)
}
