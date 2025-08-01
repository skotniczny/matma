import Stats from './stats'
import form from './form'
import resultsTable from './resultTable'
import { qS as $, elt } from './dom'
import { getRandomInt } from './random'

const app = {
  stats: new Stats(),
  activeElementId: '',
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
    if (typeof id !== 'string' || id.charAt(0) !== '#') throw new Error('Invalid id')
    this.activeElementId = id
  }
}

const operations = {
  add: '+',
  sub: '−',
  multiply: '×',
  div: '÷'
}

const boardCaption = {
  [operations.multiply]: 'Tabliczka mnożenia',
  [operations.add]: 'Dodawanie',
  [operations.sub]: 'Odejmowanie',
  [operations.div]: 'Dzielenie'
}

const func = {
  [operations.add]: (a, b) => a + b,
  [operations.sub]: (a, b) => a - b,
  [operations.multiply]: (a, b) => a * b,
  [operations.div]: (a, b) => a / b
}

const nextArgumentsFunc = {
  [operations.add]: () => {
    const rndRows = getRandomInt(0, 100)
    const rndCols = getRandomInt(0, 100 - rndRows)
    return [rndRows, rndCols]
  },
  [operations.sub]: () => {
    const rndRows = getRandomInt(0, 100)
    const rndCols = getRandomInt(0, rndRows)
    return [rndRows, rndCols]
  },
  [operations.multiply]: () => {
    const rndRows = getRandomInt(1, 10)
    const rndCols = getRandomInt(1, 10)
    return [rndRows, rndCols]
  },
  [operations.div]: () => {
    const rndRows = getRandomInt(1, 10)
    const rndCols = getRandomInt(1, 10)
    return [rndRows * rndCols, rndCols]
  }
}

export { operations, func, nextArgumentsFunc, boardCaption }
export default app
