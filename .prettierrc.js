module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [
    "^react$",
    "^react-(.*)$",
    "^@(.*)$",
    "^assets$",
    "^components$",
    "^hooks$",
    "^navigations$",
    "^navigations/(.*)$",
    "^screens$",
    "^screens/(.*)$",
    "^services$",
    "^services/(.*)$",
    "^utils$",
    "^[./]"
  ],
  importOrderSeparation: false,
};