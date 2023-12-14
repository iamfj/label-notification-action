module.exports = {
  ...require('gts/.prettierrc.json'),
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
  ],
  importOrder: [
    '^@/(.*)$',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
