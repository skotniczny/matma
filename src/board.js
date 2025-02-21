import { qS as $, elt } from './dom'

class Board {
  #tds = []
  constructor (rows, cols, title) {
    this.rows = rows
    this.cols = cols
    this.title = title
  }

  render () {
    const output = []
    const table = elt('table', { className: 'calc-table' })
    const tbody = elt('tbody')

    const code = 'A'.charCodeAt(0)
    for (let i = 0; i < this.rows; i += 1) {
      let row = `<tr data-row=${i + 1} data-row-letter=${String.fromCharCode(code + i)}>`

      for (let j = 0; j < this.cols; j++) {
        row += `<td data-row=${i + 1} data-col=${j + 1}></td>`
      }

      row += '</tr>'
      output.push(row)
    }
    tbody.innerHTML = output.join('')
    table.appendChild(tbody)
    if (this.title) {
      const caption = elt('caption', { textContent: this.title })
      table.appendChild(caption)
    }
    this.#tds = Array.from($('td', table))
    return table
  }

  paint (rows, cols) {
    for (const item of this.#tds) {
      if (item.dataset.row <= rows && item.dataset.col <= cols) {
        item.style.backgroundColor = '#ffaead'
      }
    }
  }

  clear () {
    for (const item of this.#tds) {
      item.style.backgroundColor = ''
    }
  }
}

export default Board
