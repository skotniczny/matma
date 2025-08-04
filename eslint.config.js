import globals from 'globals'
import css from '@eslint/css'
import { defineConfig } from 'eslint/config'
import neostandard from 'neostandard'

export default defineConfig([
  {
    files: ['**/*.js'],
    extends: [neostandard({ globals: globals.browser, })],
  },
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    extends: [css.configs.recommended],
  },
])
