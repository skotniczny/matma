import { qS as $, elt } from './dom'
import { operations, boardCaption } from './app'

class Board {
  #tds = []
  #colors = {
    base: '#ffaead',
    light: '#ffd5d4',
    dark: '#b80000'
  }

  constructor (rows, cols, operation) {
    this.rows = rows
    this.cols = cols
    this.operation = operation
  }

  render () {
    const output = []
    const table = elt('table', { className: 'calc-table' })
    const tbody = elt('tbody')
    const rowOffset = this.operation === operations.multiply || this.operation === operations.div ? 1 : 0

    const code = 'A'.charCodeAt(0)
    for (let i = 0; i < this.rows; i += 1) {
      let row = `<tr data-row=${i + rowOffset} data-row-letter=${String.fromCharCode(code + i)}>`

      for (let j = 0; j < this.cols; j++) {
        row += `<td data-row=${i + rowOffset} data-col=${j + 1}></td>`
      }

      row += '</tr>'
      output.push(row)
    }
    tbody.innerHTML = output.join('')
    table.appendChild(tbody)
    const caption = elt('caption', {
      textContent: boardCaption[this.operation]
    })
    table.appendChild(caption)
    this.#tds = Array.from($('td', table))
    return table
  }

  paint (rows, cols) {
    if (this.operation === operations.multiply) {
      for (const item of this.#tds) {
        if (item.dataset.row <= rows && item.dataset.col <= cols) {
          item.style.backgroundColor = this.#colors.base
        }
      }
      return
    }
    if (this.operation === operations.div) {
      const result = rows / cols
      for (const item of this.#tds) {
        if (item.dataset.row <= result && item.dataset.col <= cols) {
          item.style.backgroundColor = item.dataset.col > 1 ? this.#colors.base : this.#colors.dark
        }
      }
      return
    }
    if (this.operation === operations.add) {
      const sum = rows + cols
      for (let i = 0; i < sum; i += 1) {
        if (i < rows) {
          this.#tds[i].style.backgroundColor = this.#colors.base
        } else if (i < sum) {
          this.#tds[i].style.backgroundColor = this.#colors.dark
        }
      }
      return
    }
    if (this.operation === operations.sub) {
      const diff = rows - cols
      for (let i = 0; i < rows; i += 1) {
        if (i < diff) {
          this.#tds[i].style.backgroundColor = this.#colors.base
        } else if (i < rows) {
          this.#tds[i].style.backgroundColor = this.#colors.light
        }
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
