'use strict';

import React from 'react';
import { RouteContext } from 'react-router';
import history from '../../history';

import UserStore from '../../stores/user_store';

import AppConstants from '../../constants/application_constants';


const { object } = React.PropTypes;
const WHEN_ENUM = ['loggedIn', 'loggedOut'];

/**
 * Redirects the user conditionally according to his authentication
 *
 * @param {enum/string} options.when ('loggedIn' || 'loggedOut')
 */
export function AuthRedirect({ to, when }) {
    // validate `when`, must be contained in `WHEN_ENUM`.
    // Throw an error otherwise.
    if (WHEN_ENUM.indexOf(when) === -1) {
        const whenValues = WHEN_ENUM.join(', ');
        throw new Error(`"when" must be one of: [${whenValues}] got "${when}" instead`);
    }

    return function(currentUser, query) {
        const { redirectAuthenticated, redirect } = query;

        // The user of this handler specifies with `when`, what kind of status
        // needs to be checked to conditionally do - if that state is `true` -
        // a redirect.
        //
        // So if when === 'loggedIn', we're checking if the user is logged in (and
        // vice versa)
        const isLoggedIn = Object.keys(currentUser).length && currentUser.email;
        const exprToValidate = when === 'loggedIn' ? isLoggedIn : !isLoggedIn;

        // and redirect if `true`.
        if (exprToValidate) {
            window.setTimeout(() => history.replace({ query, pathname: to }));
            return true;

            // Otherwise there can also be the case that the backend
            // wants to redirect the user to a specific route when the user is logged out already
        } else if (!exprToValidate && when === 'loggedIn' && redirect) {
            delete query.redirect;
            window.setTimeout(() => history.replace({ query, pathname: '/' + redirect }));
            return true;

        } else if (!exprToValidate && when === 'loggedOut' && redirectAuthenticated) {
            /*
             * redirectAuthenticated contains an arbitrary path
             * eg pieces/<id>, editions/<bitcoin_id>, collection, settings, ...
             * hence transitionTo cannot be used directly.
             *
             * While we're getting rid of `query.redirect` explicitly in the
             * above `else if` statement, here it's sufficient to just call
             * `baseUrl` + `redirectAuthenticated`, as it gets rid of queries as well.
             */
            window.location = AppConstants.baseUrl + redirectAuthenticated;
            return true;
        }

        return false;
    };
}

/**
 * Can be used in combination with `Route` as an intermediate Handler
 * between the actual component we want to display dependent on a certain state
 * that is required to display that component.
 *
 * @param {[function]} redirectFn A function that conditionally redirects
 */
export function ProxyHandler(...redirectFunctions) {
    return (Component) => {
        return React.createClass({
            displayName: 'ProxyHandler',

            propTypes: {
                // Provided from AscribeApp, after the routes have been initialized
                currentUser: React.PropTypes.object,
                whitelabel: React.PropTypes.object,

                // Provided from router
                location: object
            },

            // We need insert `RouteContext` here in order to be able
            // to use the `Lifecycle` widget in further down nested components
            mixins: [RouteContext],

            componentDidMount() {
                this.evaluateRedirectFunctions();
            },

            componentWillReceiveProps(nextProps) {
                this.evaluateRedirectFunctions(nextProps);
            },

            evaluateRedirectFunctions(props = this.props) {
                const { currentUser, location: { query } } = props;

                if (UserStore.hasLoaded() && !UserStore.isLoading()) {
                    for (let i = 0; i < redirectFunctions.length; i++) {
                        // if a redirectFunction redirects the user,
                        // it should return `true` and therefore
                        // stop/avoid the execution of all functions
                        // that follow
                        if (redirectFunctions[i](currentUser, query)) {
                            break;
                        }
                    }
                }
            },

            render() {
                return (
                    <Component {...this.props} />
                );
            }
        });
    };
}
