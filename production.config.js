const { defineConfig } = require("cypress")

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportFilename: "[name]-[status]-[datetime]-report"
  },
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://cypress-tests.myshiftlab.app',
    viewportHeight : 1080,
    viewportWidth : 1920,
    defaultCommandTimeout : 20000,
    responseTimeout : 120000,
    requestTimeout : 30000,
    numTestsKeptInMemory : 10
  },
  env: {
    apiURL: 'https://shyftlab-production-api.azurewebsites.net',
    build : "production",
    loginCredentials : 'cypresstests@mailinator.com',
    passwordCredentials : '123456',
  },
});
