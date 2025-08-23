import { elt } from '../dom'

export default function MathSymbol ({ className, ...props }, ...children) {
  return elt('span', { className: `math-symbol ${className || ''}`.trim(), ...props }, ...children)
}
