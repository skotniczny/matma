import { elt } from './dom'
import { getRandomInt } from './random'
import { operations, func } from './app'

const calculateResult = (list, operator) => list.reduce((acc, item) => func[operator](acc, item))

const nextMultiplication = () => {
  const rndRows = getRandomInt(1, 10)
  const rndCols = getRandomInt(1, 10)
  return [rndRows, rndCols]
}

const nextAddition = () => {
  const rndRows = getRandomInt(0, 100)
  const rndCols = getRandomInt(0, 100 - rndRows)
  return [rndRows, rndCols]
}

const nextOperation = (app, rowsEl, colsEl) => {
  let [rndRows, rndCols] = [0, 0]
  switch (app.board.operation) {
    case operations.add: [rndRows, rndCols] = nextAddition()
      break
    case operations.multiply: [rndRows, rndCols] = nextMultiplication()
      break
  }

  rowsEl.value = rndRows
  colsEl.value = rndCols

  app.board.clear()
  app.board.paint(rndRows, rndCols)
}

function form (app) {
  const operation = app.board.operation
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

      const isSuccess = calculateResult([rows, cols], operation) === result

      app.updateHistory(isSuccess, rows, cols, result)
      app.updateResults()

      target.result.value = ''
      target.result.focus()

      if (!isSuccess) return
      nextOperation(app, rowsEl, colsEl)
    }
  })

  const inputElConfig = {
    type: 'number',
    min: 0,
    onblur: event => {
      setTimeout(() => {
        if (document.activeElement.type !== 'number') event.target.focus()
      }, 0)
    },
  }
  const inputElFactorsConfig = {
    max: operation === operations.add ? 100 : 10,
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
    max: operation === operations.add ? 200 : 100,
    autofocus: true,
    ...inputElConfig
  })
  const submitButtonEl = elt('button', {
    id: 'check',
    type: 'submit'
  }, 'Sprawdź wynik')
  nextOperation(app, rowsEl, colsEl)

  formEl.appendChild(rowsEl)
  formEl.appendChild(document.createTextNode(operation))
  formEl.appendChild(colsEl)
  formEl.appendChild(document.createTextNode('='))
  formEl.appendChild(resultEl)
  formEl.appendChild(submitButtonEl)

  return formEl
}

export default form
