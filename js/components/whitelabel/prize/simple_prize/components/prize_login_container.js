'use strict';

import React from 'react';
import { Link } from 'react-router';

import LoginForm from '../../../../ascribe_forms/form_login';

import { getLangText } from '../../../../../utils/lang_utils';
import { setDocumentTitle } from '../../../../../utils/dom_utils';


let LoginContainer = React.createClass({
    propTypes: {
        // Provided from PrizeApp
        currentUser: React.PropTypes.object,
        whitelabel: React.PropTypes.object,

        // Provided from router
        location: React.PropTypes.object
    },

    render() {
        setDocumentTitle(getLangText('Log in'));

        return (
            <div className="ascribe-login-wrapper">
                <LoginForm
                    headerMessage={getLangText('Log in with ascribe')}
                    location={this.props.location} />
                <div className="ascribe-login-text">
                    {getLangText('I forgot my password') + ' '}
                    <Link to="/password_reset">{getLangText('Rescue me...')}</Link>
                </div>
            </div>
        );
    }
});



export default LoginContainer;
