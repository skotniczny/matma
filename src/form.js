import { elt } from './dom'
import { getRandomInt } from './random'

function nextMultiplication (app, rowsEl, colsEl) {
  const rndRows = getRandomInt(1, 10)
  const rndCols = getRandomInt(1, 10)

  rowsEl.value = rndRows
  colsEl.value = rndCols

  app.board.clear()
  app.board.paint(rndRows, rndCols)
}

function form (app) {
  const formEl = elt('form', {
    name: 'equation',
    className: 'd-inline-flex',
    onsubmit: event => {
      event.preventDefault()
      const target = event.target
      if (target.result.value === '') {
        app.updateInfo()
        return
      }

      const rows = Number(target.rows.value)
      const cols = Number(target.columns.value)
      const result = Number(target.result.value)

      const isSuccess = (rows * cols) === result

      app.updateHistory(isSuccess, rows, cols, result)
      app.updateResults()

      target.result.value = ''
      target.result.focus()

      if (!isSuccess) return
      nextMultiplication(app, rowsEl, colsEl)
    }
  })

  const inputElConfig = {
    type: 'number',
    min: 0,
    onblur: event => {
      setTimeout(() => {
        if (document.activeElement === document.body) event.target.focus()
      }, 0)
    },
  }
  const inputElFactorsConfig = {
    max: 10,
    oninput: () => {
      resultEl.value = ''
      const rows = Number(rowsEl.value)
      const columns = Number(colsEl.value)
      app.board.clear()
      if (rows === 0 || columns === 0) return
      app.board.paint(rows, columns)
    },
    ...inputElConfig
  }

  const rowsEl = elt('input', {
    id: 'rows',
    name: 'rows',
    ...inputElFactorsConfig
  })
  const colsEl = elt('input', {
    id: 'columns',
    name: 'columns',
    ...inputElFactorsConfig
  })
  const resultEl = elt('input', {
    id: 'result',
    name: 'result',
    max: 100,
    autofocus: true,
    ...inputElConfig
  })
  const submitButtonEl = elt('button', {
    id: 'check',
    type: 'submit'
  }, 'Sprawdź wynik')
  nextMultiplication(app, rowsEl, colsEl)

  formEl.appendChild(rowsEl)
  formEl.appendChild(document.createTextNode('×'))
  formEl.appendChild(colsEl)
  formEl.appendChild(document.createTextNode('='))
  formEl.appendChild(resultEl)
  formEl.appendChild(submitButtonEl)

  return formEl
}

export default form
