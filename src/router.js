import Board from './board'
import app, { operations } from './app'
import { qS as $ } from './dom'

const routes = {
  '/dodawanie': {
    title: 'Matma | Dodawanie',
    board: () => new Board(10, 10, operations.add)
  },
  '/odejmowanie': {
    title: 'Matma | Odejmowanie',
    board: () => new Board(10, 10, operations.sub)
  },
  '/dzielenie': {
    title: 'Matma | Dzielenie',
    board: () => new Board(10, 10, operations.div)
  },
  '/': {
    title: 'Matma | Tabliczka mnożenia',
    board: () => new Board(10, 10, operations.multiply)
  }
}

function renderRoute (path) {
  const config = routes[path] || routes['/']
  document.title = config.title
  app.init(config.board())
  if (app.activeElementId) $(app.activeElementId).focus()
}

export function route (path) {
  history.pushState({}, '', path)
  renderRoute(path)
}

export function initRouter () {
  window.addEventListener('popstate', () => {
    renderRoute(location.pathname)
  })
}
