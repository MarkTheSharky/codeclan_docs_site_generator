const path = require('path')

const { createDevApp } = require('vuepress')
const { viteBundler } = require('@vuepress/bundler-vite')
const config = require('../../docs/.vuepress/config')


const dev = async () => {
    const app = createDevApp({
      ...config,
      source: 'docs',
      bundler: viteBundler({
        viteOptions: {
          resolve: {
            alias: {
              '@root': path.join(__dirname, '..', '..', '..')
            }
          }
        },
        vuePluginOptions: {},
      }),
    })

    // initialize and prepare
    await app.init()

    await app.prepare()

    // start dev server
    const closeDevServer = await app.dev()
  
    // set up file watchers
    const watchers = []
  
    // restart dev server
    const restart = async () => {
      await Promise.all([
        // close all watchers
        ...watchers.map((item) => item.close()),
        // close current dev server
        closeDevServer(),
      ])
      await dev()
    }
  
    // process onWatched hook
    await app.pluginApi.hooks.onWatched.process(app, watchers, restart)
  }

module.exports = { dev }