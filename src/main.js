import './style.css'
import { initApp } from './app'
import { qS as $ } from './dom'

initApp('/' + window.location.pathname.split('/').pop())

$('#appMenu').addEventListener('click', event => {
  event.preventDefault()
  const el = event.target
  const focusId = `#${document.activeElement.id}`
  if (el.tagName !== 'A') return
  initApp(el.pathname, el.textContent)
  $(focusId).focus()
})
