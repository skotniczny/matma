import globals from 'globals'
import css from '@eslint/css'
import neostandard from 'neostandard'

export default [
  ...neostandard({ globals: globals.browser }).map(config => ({
    ...config,
    files: ['**/*.js']
  })),
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    ...css.configs.recommended,
  },
]
