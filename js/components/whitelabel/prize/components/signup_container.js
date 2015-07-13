'use strict';

import React from 'react';
import SignupForm from '../../../ascribe_forms/form_signup';


let SignupContainer = React.createClass({
    getInitialState() {
        return {
            submitted: false,
            message: null
        };
    },

    handleSuccess(message){
        this.setState({
            submitted: true,
            message: message
        });
    },

    render() {
        if (this.state.submitted){
            return (
                <div className="ascribe-login-wrapper">
                    <br/>
                    <div className="ascribe-login-text ascribe-login-header">
                    {this.state.message}
                    </div>
                </div>
            );
        }
        return (
            <div className="ascribe-login-wrapper">
                <SignupForm
                    headerMessage="Sign up to the prize"
                    submitMessage="Sign up"
                    handleSuccess={this.handleSuccess} />
            </div>
        );
    }
});


export default SignupContainer;
