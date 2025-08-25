import { elt } from '../dom'

export default function HistoryEntry ({ className, ...props }, ...children) {
  return elt('div', {
    className: `history-entry ${className || ''}`.trim(),
    ...props
  }, ...children)
}
