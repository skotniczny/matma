import globals from 'globals'
import neostandard from 'neostandard'

export default [
  ...neostandard(),
  { languageOptions: { globals: globals.browser } },
]
