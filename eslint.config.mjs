import studio from '@sanity/eslint-config-studio'

export default [
  ...studio,
  {
    files: ['**/*.ts', '**/*.js', '**/*.mjs'],
    env: {
      node: true,
      es2021: true,
    },
  },
]
