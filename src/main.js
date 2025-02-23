import './style.css'
import Board from './board'
import app, { operations } from './app'
import { qS as $ } from './dom'

app.init(new Board(10, 10, operations.multiply))

$('#appMenu').addEventListener('click', event => {
  event.preventDefault()
  const el = event.target
  const focusId = `#${document.activeElement.id}`
  if (el.tagName !== 'A') return
  const path = el.pathname
  if (path === '/') {
    history.pushState({}, '', './')
    document.title = 'Matma | Tabliczka mnożenia'
    app.init(new Board(10, 10, operations.multiply))
  }

  if (path === '/dodawanie') {
    history.pushState({}, '', './dodawanie')
    document.title = 'Matma | Dodawanie'
    app.init(new Board(10, 10, operations.add))
  }
  $(focusId).focus()
})
