const path = require('path')

const { defaultTheme } = require('vuepress')
const { searchPlugin } = require('@vuepress/plugin-search')
const { copyCodePlugin } = require("vuepress-plugin-copy-code2");


const buildSidebar = require('./getSidebar.js')
const makeNavbar = require('./getNavbar.js')

module.exports = {
    // site config
  lang: 'en-US',
  title: 'Course Notes',
  alias: {
    '@root': path.join(__dirname, '..', '..', '..')
  },

  // theme and its config
  theme: defaultTheme({
    logo: 'codeclan_logo_lighttheme.png',
    logoDark: 'codeclan_logo_darktheme.png',
    navbar: [
      {
        text: 'Class Notes',
        children: makeNavbar('docs/codeclan')
      },
    ],
    sidebarDepth: 0,
    sidebar: buildSidebar('docs/codeclan'),
    lastUpdated: false,
    contributors: false,
  }),

  plugins: [
    searchPlugin({ maxSuggestions: 10 }),
    copyCodePlugin({pure: true}),
  ],
}