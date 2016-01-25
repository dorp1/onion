import 'core-js/es6';
import 'core-js/stage/4';
import 'classlist-polyfill';
import 'isomorphic-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import AppResolver from './app_resolver';
import history from './history';

import { getDefaultSubdomainSettings, getSubdomainSettings } from './utils/constants_utils';
import { initLogging } from './utils/error_utils';
import { getSubdomain } from './utils/general_utils';
import requests from './utils/requests';

// FIXME: rename these event actions
import EventActions from './actions/event_actions';

// You can comment out the modules you don't need
// import DebugHandler from './third_party/debug_handler';
import './third_party/facebook_handler';
import './third_party/ga_handler';
import './third_party/intercom_handler';
import './third_party/notifications_handler';
import './third_party/raven_handler';

// Import global stylesheet
import '../sass/main.scss';


const AppGateway = {
    start() {
        let subdomainSettings;

        try {
            subdomainSettings = getSubdomainSettings(getSubdomain());
        } catch (err) {
            // if there are no matching subdomains, we''ll route to the default frontend
            console.logGlobal(err);
            subdomainSettings = getDefaultSubdomainSettings();
        }

        this.load(subdomainSettings);
    },

    load(settings) {
        // Send the applicationWillBoot event to the third-party stores
        EventActions.applicationWillBoot(settings);

        // `history.listen` is called on every route change, which is perfect for routeDidChange
        // events.
        history.listen(EventActions.routeDidChange);

        // Adds a client specific class to the body for whitelabel styling
        window.document.body.classList.add(`client--${settings.subdomain}`);

        AppResolver
            .resolve(settings)
            .then(({ apiUrls, redirectRoute, routes }) => {
                // Initialize api urls and defaults for outgoing requests
                requests.defaults({
                    urlMap: apiUrls,
                    http: {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    }
                });

                ReactDOM.render((
                    <Router history={history}>
                        {redirectRoute}
                        {routes}
                    </Router>
                ), document.getElementById('main'));

                // Send the applicationDidBoot event to the third-party stores
                EventActions.applicationDidBoot(settings);
            });
    }
};

// Initialize pre-start components
initLogging();

// And bootstrap app
AppGateway.start();
