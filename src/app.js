import Stats from './stats'
import form from './form'
import resultsTable from './resultTable'
import { qS as $, elt } from './dom'

const app = {
  stats: new Stats(),
  activeElementId: '#result',
  counter: 0,
  init (board) {
    this.board = board
    $('#tableContainer').replaceChildren(board.render())
    $('#form').replaceChildren(form())
  },
  updateResults () {
    const statsArr = this.stats.get()
    statsArr.sort((a, b) => (a[2] / a[1]) - (b[2] / b[1]))
    const tableEl = resultsTable(statsArr)
    $('#results').replaceChildren(tableEl)
  },
  updateHistory (isSuccess, rows, cols, result) {
    const operation = this.board.operation
    const elInfo = elt(isSuccess ? 'span' : 's', { textContent: result }).outerHTML
    const newItem = `<div class=${isSuccess ? 'success' : 'error'}>${++this.counter}. ${this.updateInfo(isSuccess)} - ${rows} ${operation} ${cols} = ${elInfo}</div>`
    const historyEl = $('.history')[0]
    historyEl.innerHTML = newItem + historyEl.innerHTML
    this.stats.add(`${rows}${operation}${cols}`, isSuccess)
  },
  updateInfo (isSuccess) {
    let message = 'Podaj wynik!'
    if (isSuccess !== undefined) {
      message = isSuccess ? 'Gratulacje!' : 'Błąd'
    }
    $('h1')[0].textContent = message
    return message
  },
  clearBoard () {
    this.board.clear()
  },
  paintBoard (rows, cols) {
    this.board.paint(rows, cols)
  },
  setActiveElementId (id) {
    if (id.charAt(0) !== '#') throw new Error('Invalid id')
    this.activeElementId = id
  }
}

const operations = {
  add: '+',
  multiply: '×',
}

const func = {
  [operations.add]: (a, b) => a + b,
  [operations.multiply]: (a, b) => a * b,
}

export { operations, func }
export default app
