import './HistoryEntry.css'
import { elt } from '../dom'

export default function HistoryEntry ({ className, ...props }, ...children) {
  return elt('li', {
    className: `history-entry ${className || ''}`.trim(),
    ...props
  }, ...children)
}
