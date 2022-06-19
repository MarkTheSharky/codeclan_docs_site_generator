const path = require('path')
const chokidar = require("chokidar");

const { createDevApp } = require('vuepress')
const { viteBundler } = require('@vuepress/bundler-vite')
const config = require('../../docs/.vuepress/config')


const launchDevServer = async () => {
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
    // console.log(app.pages);

    await app.prepare()

    // start dev server
    const closeDevServer = await app.dev()
  
    // set up file watchers
    const watchers = []
  
    // shutdown dev server
    const shutdown = async () => {
      await Promise.all([
        // close all watchers
        ...watchers.map((item) => item.close()),
        // close current dev server
        closeDevServer()
      ])
    }

    // Set up watcher
    const watchPath = 'app/docs_prep/data/fileErrors.txt'

    const fileWatcher = chokidar.watch(watchPath, {cwd: path.join(__dirname, '..', '..', '..')})
      .on('change', (path) => {
        console.log('Shutting down server')
        shutdown()
      })
      .on('add', (path) => {
        console.log('Shutting down server')
        shutdown()
      })

    watchers.push(fileWatcher)

    // process onWatched hook
    await app.pluginApi.hooks.onWatched.process(app, watchers, shutdown)
  }

module.exports = { launchDevServer }