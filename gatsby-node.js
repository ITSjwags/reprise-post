const path = require('path')

exports.createPages = async ({ actions }) => {
  const { createPage } = actions

  createPage({
    path: '/work/nikki',
    component: path.resolve(`./src/pages/work.js`),
    context: {
      editor: 'nikki',
    },
  })

  createPage({
    path: '/work/davis',
    component: path.resolve(`./src/pages/work.js`),
    context: {
      editor: 'davis',
    },
  })
}
