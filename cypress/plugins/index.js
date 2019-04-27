// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')

// module.exports = (on, config) => {
//   on("before:browser:launch", (browser = {}, args) => {
//     // Note that it needs to match or exceed viewportHeight and viewportWidth values specified in cypress.json.
//     if (browser.name === 'chrome') {
//       return {
//         width: 1400,
//         height: 1000
//       }
//     }
//   })
  
//   addMatchImageSnapshotPlugin(on, config)
// }
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}