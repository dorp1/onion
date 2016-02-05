'use strict';

const gemini = require('gemini');
const environment = require('../../environment');
const TIMEOUTS = environment.TIMEOUTS;

/**
 * Suite of tests against Cyland specific routes
 */
gemini.suite('Cyland', (suite) => {
    suite
        //TODO: maybe this should be changed to .ascribe-body once the PR that does this is merged
        .setCaptureElements('.ascribe-wallet-app')
        .before((actions, find) => {
            // This will be called before every nested suite begins
            actions.waitForElementToShow('.ascribe-wallet-app', TIMEOUTS.NORMAL);
        });

    gemini.suite('Landing', (landingSuite) => {
        landingSuite
            .setUrl('/')
            // Ignore Cyland's logo as it's a gif
            .ignoreElements('.cyland-landing img')
            .capture('landing', (actions, find) => {
                actions.waitForElementToShow('.cyland-landing img', TIMEOUTS.LONG);
            });
    });

    // TODO: add more tests for cyland specific pages after authentication
});
