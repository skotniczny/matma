import './style.css'
import Board from './board'
import Stats from './stats'
import form from './form'
import resultsTable from './resultTable.js'
import { qS as $, elt } from './dom.js'

const app = {
  board: new Board(10, 10, 'Tabliczka mnożenia'),
  stats: new Stats(),
  counter: 0,
  init () {
    $('#tableContainer').appendChild(app.board.render())
    $('#form').appendChild(form(app))
  },
  updateResults () {
    const statsArr = this.stats.get()
    statsArr.sort((a, b) => (a[2] / a[1]) - (b[2] / b[1]))
    const tableEl = resultsTable(statsArr)
    $('#results').replaceChildren(tableEl)
  },
  updateHistory (isSuccess, rows, cols, result) {
    const elInfo = elt(isSuccess ? 'span' : 's', { textContent: result })
    const newItem = `<div class=${isSuccess ? 'success' : 'error'}>${++this.counter}. ${this.updateInfo(isSuccess)} - ${rows} × ${cols} = ${elInfo.outerHTML}</div>`
    const historyEl = $('.history')[0]
    historyEl.innerHTML = newItem + historyEl.innerHTML
    this.stats.add(`${rows}_${cols}`, isSuccess)
  },
  updateInfo (isSuccess) {
    let message = 'Podaj wynik!'
    if (isSuccess !== undefined) {
      message = isSuccess ? 'Gratulacje!' : 'Błąd'
    }
    $('h1')[0].textContent = message
    return message
  },
}

app.init()
