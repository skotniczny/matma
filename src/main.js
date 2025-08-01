import './style.css'
import { route, initRouter } from './router'
import { qS as $ } from './dom'

initRouter()
route(window.location.pathname)

$('#appMenu').addEventListener('click', event => {
  event.preventDefault()
  const el = event.target
  if (el.tagName !== 'A') return
  route(el.pathname)
})
