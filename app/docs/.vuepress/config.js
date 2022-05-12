const buildSidebar = require('./getSidebar.js')
const makeNavbar = require('./getNavbar.js')

module.exports = {
    // site config
  lang: 'en-US',
  title: 'Course Notes',

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
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
  },

  plugins: [
    [
      '@vuepress/plugin-search',
    ],
  ],
}