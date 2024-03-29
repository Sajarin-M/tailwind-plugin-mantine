const fs = require("fs");

const colors = require("@devoss/tailwind-plugin-mantine").default().config.theme.colors ?? {}



const classes = Object.keys(colors).map(k => {
  return `bg-${k}`
})

fs.writeFileSync(require.resolve("./color-classes.ts"), `export const colorClasses = ${JSON.stringify(classes)}`)