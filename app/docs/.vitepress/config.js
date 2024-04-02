import { defineConfig } from 'vitepress'

import { makeNavBar } from './utilities/getNavbar'



// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Codeclan",
  description: "All lessons from Cohort E46",
  // src: "./docs/codeclan",
  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/.vitepress/public/codeclan_logo_lighttheme.png',
      dark: '/.vitepress/public/codeclan_logo_darktheme.png'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      {
        text: 'Class Notes',
        items: makeNavBar('docs/codeclan')
      }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

  }
})
