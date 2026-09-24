import { lintConfig } from 'oxlint-vue/antfu'

export default {
  ...lintConfig,
  ignorePatterns: [
    ...(lintConfig.ignorePatterns ?? []),
    'tools/oxlint/anti-slop/**',
  ],
  jsPlugins: [
    { name: 'regexp', specifier: 'eslint-plugin-regexp' },
    { name: 'anti-slop', specifier: './tools/oxlint/anti-slop/index.ts' },
  ],
  rules: {
    ...lintConfig.rules,
    'oxc/no-accumulating-spread': 'error',
    'anti-slop/no-array-filter-map': 'error',
    'anti-slop/no-reduce-accumulator-copy': 'error',
    'anti-slop/no-chained-type-assertions': 'error',
    'anti-slop/no-conditional-empty-object-spread': 'error',
    'anti-slop/no-known-value-widening': 'error',
    'anti-slop/no-module-mocking': 'error',
    'anti-slop/no-object-parameters': 'error',
    'anti-slop/no-reflect-apply': 'error',
    'anti-slop/no-reflect-get': 'error',
    'anti-slop/no-runtime-typeof': 'error',
    'anti-slop/no-shape-in-symbol-names': 'error',
    'anti-slop/no-unknown-parameters': 'error',
    'anti-slop/no-unknown-returns': 'error',
    'anti-slop/no-unknown-type-aliases': 'error',
    'anti-slop/no-unsafe-dictionary-type': 'error',
    'anti-slop/no-widen-then-assert': 'error',
    'anti-slop/require-readable-spacing': 'error',
    'anti-slop/require-safety-comment-for-type-assertion': 'error',
  },
  settings: {
    ...lintConfig.settings,
    vue: {
      ...lintConfig.settings?.vue,
      rules: {
        ...lintConfig.settings?.vue?.rules,
        'vue/html-self-closing': ['error', { html: { void: 'always' } }],
      },
      strictTemplates: true,
    },
  },
}
