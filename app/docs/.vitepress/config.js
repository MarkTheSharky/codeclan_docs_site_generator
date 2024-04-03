import { defineConfig } from 'vitepress'

import { makeNavBar } from './utilities/getNavbar'
import { buildSidebar } from './utilities/getSidebar'


export default defineConfig({
  title: "Codeclan",
  description: "All lessons from Cohort E46",
  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/.vitepress/public/codeclan_logo_lighttheme.png',
      dark: '/.vitepress/public/codeclan_logo_darktheme.png'
    },
    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Examples', link: '/markdown-examples' },
      {
        text: 'Class Notes',
        items: makeNavBar('docs/codeclan')
      }
    ],
    sidebar: buildSidebar('docs/codeclan'),
    footer: {
      message: 'Configured by Codeclan alumni Mark Burns',
    },
    search: {
      provider: 'local'
    }
  }
})