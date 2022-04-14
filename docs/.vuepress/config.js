const Sidebar = require('./getSidebar.js')
const makeNavbar = require('./getNavbar.js')

const sidebar = new Sidebar()
sidebar.build('docs/codeclan')

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
        text: 'Cheatsheets',
        children: makeNavbar('docs/cheatsheets')
      },
      {
        text: 'Class Notes',
        children: makeNavbar('docs/codeclan')
      },
    ],
    sidebarDepth: 0,
    // sidebar: {
    //   '/codeclan/week_01/': [
    //     {
    //       text: 'Week 1',
    //       children: [
    //         {
    //           text: 'Day 1',
    //           children: [
    //             {
    //               text: 'Command Line Basics',
    //               children: [
    //                 '/codeclan/week_01/day_1/command_line_basics/command_line_basics.md',
    //                 '/codeclan/week_01/day_1/command_line_basics/terminal_cheatsheet.md'
    //               ],
    //             },
    //             '/codeclan/week_01/day_1/homework.md',
    //             '/codeclan/week_01/day_1/what_is_programming.md'
    //           ]
    //         },
    //         {
    //           text: 'Day 2',
    //           children: [
    //             '/codeclan/week_01/day_1/homework.md',
    //             '/codeclan/week_01/day_1/what_is_programming.md'
    //           ]
    //         },
    //         '/codeclan/week_01/weekend_homework.md'
    //       ]
    //     },
    //   ]
    // },
    sidebar: sidebar['children'],
    lastUpdated: false,
    contributors: false,
  },

  plugins: [
    [
      '@vuepress/plugin-search',
    ],
  ],
}

// console.dir(sidebar['children'], { depth : 2 });
// console.dir(navbar['children'], { depth : null });
// console.log(makeNavbar('docs/codeclan'));