'use strict';

import React from 'react';
import { History } from 'react-router';

import Form from './ascribe_forms/form';
import Property from './ascribe_forms/property';
import ApiUrls from '../constants/api_urls';

import GlobalNotificationModel from '../models/global_notification_model';
import GlobalNotificationActions from '../actions/global_notification_actions';
import { getLangText } from '../utils/lang_utils';


let PasswordResetContainer = React.createClass({
    propTypes: {
        location: React.PropTypes.object
    },

    getInitialState() {
        return {isRequested: false};
    },

    handleRequestSuccess(email) {
        this.setState({isRequested: email});
    },

    render() {
        let { location } = this.props;

        if (location.query.email && location.query.token) {
            return (
                <div>
                    <PasswordResetForm
                        email={location.query.email}
                        token={location.query.token}/>
                </div>
            );
        }
        else {
            if (this.state.isRequested === false) {
                return (
                    <div>
                        <PasswordRequestResetForm
                            handleRequestSuccess={this.handleRequestSuccess}/>
                    </div>
                );
            }
            else if (this.state.isRequested) {
                return (
                    <div>
                        <div className="ascribe-login-text ascribe-login-header">
                            {getLangText('If your email address exists in our database, you will receive a password recovery link in a few minutes.')}
                        </div>
                    </div>
                );
            }
            else {
                return <span />;
            }
        }
  }
});

let PasswordRequestResetForm = React.createClass({
    propTypes: {
        handleRequestSuccess: React.PropTypes.func
    },

    handleSuccess() {
        let notificationText = getLangText('If your email address exists in our database, you will receive a password recovery link in a few minutes.');
        let notification = new GlobalNotificationModel(notificationText, 'success', 50000);
        GlobalNotificationActions.appendGlobalNotification(notification);
        this.props.handleRequestSuccess(this.refs.form.refs.email.state.value);
    },

    render() {
        return (
            <Form
                ref="form"
                className='ascribe-form-wrapper'
                url={ApiUrls.users_password_reset_request}
                handleSuccess={this.handleSuccess}
                buttons={
                    <button
                        type="submit"
                        className="btn ascribe-btn ascribe-btn-login">
                        {getLangText('Reset your password')}
                    </button>}
                spinner={
                    <span className="btn ascribe-btn ascribe-btn-login ascribe-btn-login-spinner">
                        <img src="https://s3-us-west-2.amazonaws.com/ascribe0/media/thumbnails/ascribe_animated_medium.gif" />
                    </span>
                    }>
                <div className="ascribe-form-header">
                    <h3>{getLangText('Reset your password')}</h3>
                </div>
                <Property
                    name='email'
                    label={getLangText('Email')}>
                    <input
                        type="email"
                        placeholder={getLangText('Enter your email and we\'ll send a link')}
                        name="email"
                        required/>
                </Property>
                <hr />
            </Form>
        );
    }
});

let PasswordResetForm = React.createClass({
    propTypes: {
        email: React.PropTypes.string,
        token: React.PropTypes.string
    },

    mixins: [History],

    getFormData() {
        return {
            email: this.props.email,
            token: this.props.token
        };
    },

    handleSuccess() {
        this.history.pushState(null, '/collection');
        let notification = new GlobalNotificationModel(getLangText('password successfully updated'), 'success', 10000);
        GlobalNotificationActions.appendGlobalNotification(notification);
    },

    render() {
        return (
            <Form
                ref="form"
                className='ascribe-form-wrapper'
                url={ApiUrls.users_password_reset}
                handleSuccess={this.handleSuccess}
                getFormData={this.getFormData}
                buttons={
                    <button
                        type="submit"
                        className="btn ascribe-btn ascribe-btn-login">
                        {getLangText('Reset your password')}
                    </button>}
                spinner={
                    <span className="btn ascribe-btn ascribe-btn-login ascribe-btn-login-spinner">
                        <img src="https://s3-us-west-2.amazonaws.com/ascribe0/media/thumbnails/ascribe_animated_medium.gif" />
                    </span>
                    }>
                <div className="ascribe-form-header">
                    <h3>{getLangText('Reset the password for')} {this.props.email}</h3>
                </div>
                <Property
                    name='password'
                    label={getLangText('Password')}>
                    <input
                        type="password"
                        placeholder={getLangText('Enter a new password')}
                        name="password"
                        required/>
                </Property>
                <Property
                    name='password_confirm'
                    label={getLangText('Confirm password')}>
                    <input
                        type="password"
                        placeholder={getLangText('Enter your password once again')}
                        name="password"
                        required/>
                </Property>
                <hr />
            </Form>
        );
    }
});

export default PasswordResetContainer;
