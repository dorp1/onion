'use strict';

import React from 'react';
import Router from 'react-router';

import Form from './ascribe_forms/form';
import Property from './ascribe_forms/property';

import apiUrls from '../constants/api_urls';

import GlobalNotificationModel from '../models/global_notification_model';
import GlobalNotificationActions from '../actions/global_notification_actions';

let PasswordResetContainer = React.createClass({
    mixins: [Router.Navigation],
    getInitialState() {
        return {isRequested: false};
    },
    handleRequestSuccess(email){
        this.setState({isRequested: email});
    },
    render() {
        if (this.props.query.email && this.props.query.token) {
            return (
                <div>
                    <div className="ascribe-login-text ascribe-login-header">
                        Reset the password for {this.props.query.email}
                    </div>
                    <PasswordResetForm
                        email={this.props.query.email}
                        token={this.props.query.token}/>
                </div>
            );
        }
        else {
            if (this.state.isRequested === false) {
                return (
                    <div>
                        <div className="ascribe-login-text ascribe-login-header">
                            Reset your ascribe password
                        </div>
                        <PasswordRequestResetForm
                            handleRequestSuccess={this.handleRequestSuccess}/>
                    </div>
                );
            }
            else if (this.state.isRequested) {
                return (
                    <div>
                        <div className="ascribe-login-text ascribe-login-header">
                            An email has been sent to "{this.state.isRequested}"
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
    handleSuccess() {
        let notificationText = 'Request succesfully sent, check your email';
        let notification = new GlobalNotificationModel(notificationText, 'success', 50000);
        GlobalNotificationActions.appendGlobalNotification(notification);
        this.props.handleRequestSuccess(this.refs.form.refs.email.state.value);
    },
    render() {
        return (
            <Form
                ref="form"
                url={apiUrls.users_password_reset_request}
                handleSuccess={this.handleSuccess}
                buttons={
                    <button
                        type="submit"
                        className="btn ascribe-btn ascribe-btn-login">
                        Reset your password
                    </button>}
                spinner={
                    <button className="btn ascribe-btn ascribe-btn-login ascribe-btn-login-spinner">
                        <img src="https://s3-us-west-2.amazonaws.com/ascribe0/media/thumbnails/ascribe_animated_medium.gif" />
                    </button>
                    }>
                <Property
                    name='email'
                    label="Email">
                    <input
                        type="email"
                        placeholder="Enter your email and we'll send a link"
                        name="email"
                        required/>
                </Property>
                <hr />
            </Form>
        );
    }
});

let PasswordResetForm = React.createClass({
    mixins: [Router.Navigation],

    getFormData(){
        let data = {};
        for (let ref in this.refs.form.refs){
            data[this.refs.form.refs[ref].props.name] = this.refs.form.refs[ref].state.value;
        }
        data.digital_work_key = this.state.digitalWorkKey;
        data.email = this.props.email;
        data.token = this.props.token;
        return data;
    },
    handleSuccess() {
        this.transitionTo('pieces');
        let notification = new GlobalNotificationModel('password succesfully updated', 'success', 10000);
        GlobalNotificationActions.appendGlobalNotification(notification);
    },
    render() {
        return (
            <Form
                ref="form"
                url={apiUrls.users_password_reset}
                handleSuccess={this.handleSuccess}
                getFormData={this.getFormData}
                buttons={
                    <button
                        type="submit"
                        className="btn ascribe-btn ascribe-btn-login">
                        Reset your password
                    </button>}
                spinner={
                    <button className="btn ascribe-btn ascribe-btn-login ascribe-btn-login-spinner">
                        <img src="https://s3-us-west-2.amazonaws.com/ascribe0/media/thumbnails/ascribe_animated_medium.gif" />
                    </button>
                    }>
                <Property
                    name='password'
                    label="Password">
                    <input
                        type="password"
                        placeholder="Enter a new password"
                        name="password"
                        required/>
                </Property>
                <Property
                    name='password_confirm'
                    label="Confirm password">
                    <input
                        type="password"
                        placeholder="Enter your password once again"
                        name="password"
                        required/>
                </Property>
                <hr />
            </Form>
        );
    }
});

export default PasswordResetContainer;