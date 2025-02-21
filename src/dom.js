function qS (id, context) {
  context = context || document
  return (id.charAt(0) === '#') ? context.querySelector(id) : context.querySelectorAll(id)
}

function elt (type, props, ...children) {
  const dom = document.createElement(type)
  if (props) Object.assign(dom, props)
  for (const child of children) {
    if (typeof child !== 'string') dom.appendChild(child)
    else dom.appendChild(document.createTextNode(child))
  }
  return dom
}

export { qS, elt }
