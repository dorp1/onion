'use strict';

import React from 'react';
import Header from '../../header';
import Footer from '../../footer';

import GlobalNotification from '../../global_notification';

import classNames from 'classnames';

import { getSubdomain } from '../../../utils/general_utils';


let WalletApp = React.createClass({
    propTypes: {
        children: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf(React.PropTypes.element),
            React.PropTypes.element
        ]),
        history: React.PropTypes.object,
        routes: React.PropTypes.arrayOf(React.PropTypes.object)
    },

    render() {
        let header = null;
        let subdomain = getSubdomain();
        const { history, routes, children } = this.props;

        // The second element of routes is always the active component object, where we can
        // extract the path.
        let path = routes[1] ? routes[1].path : null;

        // if the path of the current activeRoute is not defined, then this is the IndexRoute
        if ((!path || history.isActive('/login') || history.isActive('/signup') || history.isActive('/contract_notifications'))
            && (['ikonotv', 'cyland']).indexOf(subdomain) > -1) {
            header = (<div className="hero"/>);
        } else {
            header = <Header showAddWork={true} routes={routes} />;
        }

        // In react-router 1.0, Routes have no 'name' property anymore. To keep functionality however,
        // we split the path by the first occurring slash and take the first splitter.
        return (
            <div className={classNames('ascribe-wallet-app', 'route--' + (path ? path.split('/')[0] : 'landing'))}>
                <div className='container'>
                    {header}
                    {children}
                    <GlobalNotification />
                    <div id="modal" className="container"></div>
                    <Footer />
                </div>
            </div>
        );
    }
});

export default WalletApp;
