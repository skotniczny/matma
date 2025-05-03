import app, { operations, func, nextArgumentsFunc } from './app'
import { elt } from './dom'

const calculateResult = (list, operator) => list.reduce((acc, item) => func[operator](acc, item))

const nextOperation = (rowsEl, colsEl) => {
  const next = nextArgumentsFunc[app.board.operation]
  let [rndRows, rndCols] = next()
  while (app.board.operation === operations.div && rndRows > 30) {
    [rndRows, rndCols] = next()
  }

  rowsEl.value = rndRows
  colsEl.value = rndCols

  app.clearBoard()
  app.paintBoard(rndRows, rndCols)
}

function form () {
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
      nextOperation(rowsEl, colsEl)
    }
  })

  const inputElConfig = {
    type: 'number',
    min: 0,
    onblur: event => {
      const inputEl = event.target
      app.setActiveElementId(`#${inputEl.id}`)
      setTimeout(() => {
        if (document.activeElement.type !== 'number') inputEl.focus()
      }, 0)
    },
  }
  const inputElFactorsConfig = {
    max: operation === operations.add || operation.sub ? 100 : 10,
    oninput: () => {
      resultEl.value = ''
      const rows = Number(rowsEl.value)
      const columns = Number(colsEl.value)
      app.clearBoard()
      if (rows === 0 || columns === 0) return
      app.paintBoard(rows, columns)
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
  nextOperation(rowsEl, colsEl)

  formEl.appendChild(rowsEl)
  formEl.appendChild(document.createTextNode(operation))
  formEl.appendChild(colsEl)
  formEl.appendChild(document.createTextNode('='))
  formEl.appendChild(resultEl)
  formEl.appendChild(submitButtonEl)

  return formEl
}

export default form
