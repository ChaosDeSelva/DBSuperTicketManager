module.exports = {
  'New ticket modal pops up on successful click action': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('#ticket-title')
      .setValue('#ticket-title', 'abcd')
      .waitForElementVisible('#add-ticket')
      .click('#add-ticket')
      .pause(1000)
      .assert.visible('#ticket-success-modal')
      .end();
  },
  'New ticket modal pops up on successful enter action': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('#ticket-title')
      .setValue('#ticket-title', 'abcd')
      .waitForElementVisible('#add-ticket')
      .keys('\uE007')
      .pause(1000)
      .assert.visible('#ticket-success-modal')
      .end();
  },
  'New ticket submission with no text shows error message': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('#ticket-title')
      .setValue('#ticket-title', '')
      .waitForElementVisible('#add-ticket')
      .click('#add-ticket')
      .pause(1000)
      .assert.visible('.error')
      .end();
  },
};
