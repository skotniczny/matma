import app, { operations, func, nextArgumentsFunc } from './app'
import Button from './components/Button'
import Input from './components/Input'
import Form from './components/Form'
import MathSymbol from './components/MathSymbol'

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

// Event Handlers
const handleOnBlur = event => {
  const inputEl = event.target
  app.setActiveElementId(`#${inputEl.id}`)
  setTimeout(() => {
    if (document.activeElement.type !== 'number') inputEl.focus()
  }, 0)
}

const handleOnInput = (colsEl, rowsEl, resultEl) => {
  resultEl.value = ''
  const rows = Number(rowsEl.value)
  const columns = Number(colsEl.value)
  app.clearBoard()
  if (rows === 0 || columns === 0) return
  app.paintBoard(rows, columns)
}

const handleOnSubmit = (event, operation, rowsEl, colsEl) => {
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

// Crate Submit Button Element
const submitButtonEl = Button({
  id: 'check',
  type: 'submit',
}, 'Sprawdź wynik')

// Create Equal Sign Element
const equalSignEl = MathSymbol({ className: 'symbol-equality' }, '=')

// Create Form Element
function form () {
  const operation = app.board.operation

  const inputElConfig = {
    type: 'number',
    min: 0,
    onblur: event => handleOnBlur(event)
  }
  const inputElFactorsConfig = {
    oninput: _ => handleOnInput(colsEl, rowsEl, resultEl),
    ...inputElConfig
  }

  const rowsEl = Input({
    id: 'rows',
    name: 'rows',
    max: operation === operations.multiply ? 10 : 100,
    ...inputElFactorsConfig
  })
  const colsEl = Input({
    id: 'columns',
    name: 'columns',
    max: [operations.add, operations.sub].includes(operation) ? 100 : 10,
    ...inputElFactorsConfig
  })
  const resultEl = Input({
    id: 'result',
    name: 'result',
    max: operation === operations.add ? 200 : 100,
    autofocus: true,
    ...inputElConfig
  })
  const operationEl = MathSymbol({ className: 'symbol-arithmetic' }, operation)
  nextOperation(rowsEl, colsEl)

  return Form({
    name: 'equation',
    className: 'd-inline-flex',
    onsubmit: event => handleOnSubmit(event, operation, rowsEl, colsEl)
  }, rowsEl, operationEl, colsEl, equalSignEl, resultEl, submitButtonEl)
}

export default form
