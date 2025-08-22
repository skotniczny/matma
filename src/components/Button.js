import { elt } from '../dom'

export default function Button ({ className, ...props }, ...children) {
  return elt('button', {
    className: `btn ${className || ''}`.trim(),
    ...props
  }, ...children)
}
