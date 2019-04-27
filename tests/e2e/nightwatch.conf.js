const serverPath = require('selenium-server').path;
const chromedriver = require('chromedriver').path;

module.exports = {
  src_folders: ['specs'],
  output_folder: 'tests/e2e/reports',
  selenium: {
    start_process: true,
    server_path: serverPath,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'WebDriver.chrome.driver': chromedriver,
    },
  },
  test_settings: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
      },
    },
  },
};
