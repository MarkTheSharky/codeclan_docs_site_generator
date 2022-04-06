
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
        text: 'Lessons',
        children: [
          {
            text: 'Week 1',
            link: '/codeclan/week_01/'
          }
        ]
      },
    ],
    sidebarDepth: 0,
    sidebar: {
      '/codeclan/week_01/': [
        '/codeclan/week_01/README.md',
        {
          text: 'Week 1',
          children: [
            {
              text: 'Day 1',
              children: [
                {
                  text: 'Command Line Basics',
                  children: [
                    '/codeclan/week_01/day_1/command_line_basics/command_line_basics.md',
                    '/codeclan/week_01/day_1/command_line_basics/terminal_cheatsheet.md'
                  ],
                },
                '/codeclan/week_01/day_1/homework.md',
                '/codeclan/week_01/day_1/what_is_programming.md'
              ]
            },
            {
              text: 'Day 2',
              children: [
                '/codeclan/week_01/day_1/homework.md',
                '/codeclan/week_01/day_1/what_is_programming.md'
              ]
            },
            {
              text: 'Day 3',
              children: [
                '/codeclan/week_01/day_1/homework.md',
                '/codeclan/week_01/day_1/what_is_programming.md'
              ]
            },
            {
              text: 'Day 4',
              children: [
                '/codeclan/week_01/day_1/homework.md',
                '/codeclan/week_01/day_1/what_is_programming.md'
              ]
            },
            {
              text: 'Day 5',
              children: [
                '/codeclan/week_01/day_1/homework.md',
                '/codeclan/week_01/day_1/what_is_programming.md'
              ]
            },
            '/codeclan/week_01/weekend_homework.md'
          ]
        },
      ]
    },
    lastUpdated: false,
    contributors: false,
  },

  plugins: [
    [
      '@vuepress/plugin-search',
    ],
  ],
}