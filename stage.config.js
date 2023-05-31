const { defineConfig } = require("cypress")

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportFilename: "[status]-[datetime]-[name]-report"
  },
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    //change url for other companies, 
    baseUrl: 'https://andrew-company.stage.myshiftlab.app/',
    viewportHeight : 1080,
    viewportWidth : 1920,
    defaultCommandTimeout : 20000,
    responseTimeout : 120000,
    requestTimeout : 30000,
    numTestsKeptInMemory : 0
  },
  env: {
    build : "development",
  },
});
