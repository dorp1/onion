'use strict';

const gemini = require('gemini');
const environment = require('../../environment');
const MAIN_USER = environment.MAIN_USER;
const TIMEOUTS = environment.TIMEOUTS;

/**
 * Basic suite of tests against whitelabel routes that do not require authentication.
*/
gemini.suite('Whitelabel basic', (suite) => {
    suite
        .setCaptureElements('.ascribe-wallet-app > .container')
        .before((actions, find) => {
            // This will be called before every nested suite begins unless that suite
            // also defines a `.before()`
            // FIXME: use a more generic class for this, like just '.ascribe-app'
            actions.waitForElementToShow('.ascribe-wallet-app', TIMEOUTS.NORMAL);

            // Use a dumb wait in case we're still waiting for other assets, like fonts, to load
            actions.wait(1000);
        });

    gemini.suite('Login', (loginSuite) => {
        loginSuite
            .setUrl('/login')
            // See Ikono
            .skip(/Ikono/)
            .capture('login', (actions, find) => {
                actions.waitForElementToShow('.ascribe-form', TIMEOUTS.NORMAL);
                // For some reason, the screenshots seem to keep catching the whitelabel login form
                // on a refresh and without fonts loaded (maybe because they're the first tests run
                // and the cache isn't hot yet?).
                // Let's wait a bit and hope they load.
                actions.wait(TIMEOUTS.SHORT);
            })
            .capture('hover on login submit', (actions, find) => {
                actions.mouseMove(find('.ascribe-form button[type=submit]'));
            })
            .capture('login form filled with focus', (actions, find) => {
                const emailInput = find('.ascribe-form input[name=email]');

                // Remove hover from sign up link
                actions.click(emailInput);

                actions.sendKeys(emailInput, MAIN_USER.email);
                actions.sendKeys(find('.ascribe-form input[name=password]'), MAIN_USER.password);
            })
            .capture('login form filled', (actions, find) => {
                actions.click(find('.ascribe-form-header'));
            });
    });

    gemini.suite('Password reset', (passwordResetSuite) => {
        passwordResetSuite
            .setUrl('/password_reset')
            .capture('password reset', (actions, find) => {
                actions.waitForElementToShow('.ascribe-form', TIMEOUTS.NORMAL);
                // Wait in case the form reloads due to other assets loading
                actions.wait(500);
            })
            .capture('password reset form filled with focus', (actions, find) => {
                actions.sendKeys(find('.ascribe-form input[name="email"]'), MAIN_USER.email);
            })
            .capture('password reset form filled', (actions, find) => {
                actions.click(find('.ascribe-form-header'));
            });
    });

    gemini.suite('Coa verify', (coaVerifySuite) => {
        coaVerifySuite
            .setUrl('/coa_verify')
            .capture('coa verify', (actions, find) => {
                actions.waitForElementToShow('.ascribe-form', TIMEOUTS.NORMAL);
                // Wait in case the form reloads due to other assets loading
                actions.wait(500);
            })
            .capture('coa verify form filled with focus', (actions, find) => {
                actions.sendKeys(find('.ascribe-form input[name="message"]'), 'sample text');
                actions.sendKeys(find('.ascribe-form .ascribe-property-wrapper:nth-of-type(2) textarea'), 'sample signature');
            })
            .capture('coa verify form filled', (actions, find) => {
                actions.click(find('.ascribe-login-header'));
            });
    });

    gemini.suite('Not found', (notFoundSuite) => {
        notFoundSuite
            .setUrl('/not_found_page')
            .capture('not found page');
    });
});
