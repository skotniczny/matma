import { elt } from '../dom'

function Caption ({ className, ...props }, ...children) {
  return elt('caption', {
    className: `table-caption ${className || ''}`.trim(),
    ...props
  }, ...children)
}

function TBody ({ className, ...props }) {
  return elt('tbody', {
    className: `table-body ${className || ''}`.trim(),
    ...props
  })
}

function THead ({ className, ...props }) {
  return elt('thead', {
    className: `table-head ${className || ''}`.trim(),
    ...props
  })
}

function TFooter ({ className, ...props }) {
  return elt('tfooter', {
    className: `table-footer ${className || ''}`.trim(),
    ...props
  })
}

export default function Table ({ className, ...props }, { tbody, thead, tfooter, caption }, ...children) {
  const tableContent = [
    thead ? THead({ innerHTML: thead }) : null,
    tbody ? TBody({ innerHTML: tbody }) : null,
    tfooter ? TFooter({ innerHTML: tfooter }) : null,
    caption ? Caption({}, caption) : null
  ].filter(item => item)
  return elt('table', {
    className: `table-component ${className || ''}`.trim(),
    ...props
  }, ...tableContent, ...children)
}
