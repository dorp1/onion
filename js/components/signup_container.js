import React from 'react';
import Link from 'react-router/es6/Link';

import SignupForm from './ascribe_forms/form_signup';

import withContext from './context/with_context';
import { whitelabelShape } from './prop_types';

import { setDocumentTitle } from '../utils/dom';
import { getLangText } from '../utils/lang';


let SignupContainer = React.createClass({
    propTypes: {
        // Injected through HOCs
        whitelabel: whitelabelShape.isRequired
    },

    getInitialState() {
        return {
            submitted: false,
            message: null
        };
    },

    handleSuccess(message) {
        this.setState({
            submitted: true,
            message: message
        });
    },

    render() {
        const { whitelabel: { name: whitelabelName } } = this.props;
        const { message, submitted } = this.state;

        setDocumentTitle(getLangText('Sign up'));

        if (submitted) {
            return (
                <div className="ascribe-login-wrapper">
                    <br/>
                    <div className="ascribe-login-text ascribe-login-header">
                        {message}
                    </div>
                </div>
            );
        }
        return (
            <div className="ascribe-login-wrapper">
                <SignupForm
                    handleSuccess={this.handleSuccess}
                    whitelabelName={whitelabelName} />
                <div className="ascribe-login-text">
                    {getLangText(`Already a ${whitelabelName || 'ascribe'} user`)}&#63; <Link to="/login">{getLangText('Log in')}...</Link><br/>
                </div>
            </div>

        );
    }
});

export default withContext(SignupContainer, 'whitelabel');
