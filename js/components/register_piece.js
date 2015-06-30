'use strict';

import React from 'react';

import { getCookie } from '../utils/fetch_api_utils';
import AppConstants from '../constants/application_constants';

import Router from 'react-router';

import GlobalNotificationModel from '../models/global_notification_model';
import GlobalNotificationActions from '../actions/global_notification_actions';

import Form from './ascribe_forms/form';
import Property from './ascribe_forms/property';

import apiUrls from '../constants/api_urls';

import ReactS3FineUploader from './ascribe_uploader/react_s3_fine_uploader';

import DatePicker from 'react-datepicker/dist/react-datepicker';


let RegisterPiece = React.createClass( {
    mixins: [Router.Navigation],

    getInitialState(){
        return {
            digitalWorkKey: null,
            isUploadReady: false
        };
    },

    handleSuccess(){
        let notification = new GlobalNotificationModel('Login successsful', 'success', 10000);
        GlobalNotificationActions.appendGlobalNotification(notification);
        this.transitionTo('pieces');
    },

    getFormData(){
        let data = {};
        for (let ref in this.refs.form.refs){
            data[this.refs.form.refs[ref].props.name] = this.refs.form.refs[ref].state.value;
        }
        data.digital_work_key = this.state.digitalWorkKey;
        return data;
    },

    submitKey(key){
        this.setState({
            digitalWorkKey: key
        });
    },

    setIsUploadReady(isReady) {
        this.setState({
            isUploadReady: isReady
        });
    },

    isReadyForFormSubmission(files) {
        files = files.filter((file) => file.status !== 'deleted' && file.status !== 'canceled');
        if(files.length > 0 && files[0].status === 'upload successful') {
            return true;
        } else {
            return false;
        }
    },

    render() {
        return (
            <div className="row ascribe-row">
                <div className="col-md-12">
                    <h3 style={{'marginTop': 0}}>Lock down title</h3>
                    <Form
                        ref='form'
                        url={apiUrls.pieces_list}
                        getFormData={this.getFormData}
                        handleSuccess={this.handleSuccess}
                        buttons={<button 
                                    type="submit"
                                    className="btn ascribe-btn ascribe-btn-login"
                                    disabled={!this.state.isUploadReady}>
                                    Register your artwork
                                </button>}
                        spinner={
                            <button className="btn ascribe-btn ascribe-btn-login ascribe-btn-login-spinner">
                                <img src="https://s3-us-west-2.amazonaws.com/ascribe0/media/thumbnails/ascribe_animated_medium.gif" />
                            </button>
                            }>
                        <Property
                            label="Files to upload">
                            <FileUploader
                                submitKey={this.submitKey}
                                setIsUploadReady={this.setIsUploadReady}
                                isReadyForFormSubmission={this.isReadyForFormSubmission}/>
                        </Property>
                        <Property
                            name='artist_name'
                            label="Artist Name">
                            <input
                                type="text"
                                placeholder="The name of the creator"
                                required/>
                        </Property>
                        <Property
                            name='title'
                            label="Artwork title">
                            <input
                                type="text"
                                placeholder="The title of the artwork"
                                required/>
                        </Property>
                        <Property
                            name='date_created'
                            label="Year Created">
                            <input
                                type="number"
                                placeholder="Year Created (e.g. 2015)"
                                min={0}
                                required/>
                        </Property>
                        <Property
                            name='num_editions'
                            label="Number of editions">
                            <input
                                type="number"
                                placeholder="Specify the number of unique editions for this artwork"
                                min={1}
                                required/>
                        </Property>
                        <hr />
                    </Form>
                </div>
            </div>
        );
    }
});


let FileUploader = React.createClass({
    propTypes: {
        setIsUploadReady: React.PropTypes.func,
        submitKey: React.PropTypes.func,
        isReadyForFormSubmission: React.PropTypes.func
    },

    render() {
        return (
            <ReactS3FineUploader
                keyRoutine={{
                    url: AppConstants.serverUrl + 's3/key/',
                    fileClass: 'digitalwork'
                }}
                createBlobRoutine={{
                    url: apiUrls.blob_digitalworks
                }}
                submitKey={this.props.submitKey}
                validation={{
                    itemLimit: 100000,
                    sizeLimit: '25000000000'
                }}
                setIsUploadReady={this.props.setIsUploadReady}
                isReadyForFormSubmission={this.props.isReadyForFormSubmission}/>
        );
    }
});


let InputDate = React.createClass({
    propTypes: {
        placeholderText: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getInitialState() {
        return {
            value: null,
            value_formatted: null
        };
    },

    handleChange(date) {
        this.setState({
            value: date,
            value_formatted: date.format('YYYY')});
        let event = document.createEvent('HTMLEvents');
        event.initEvent('click', false, true);
        document.dispatchEvent(event);
        event.target.value = date;
        this.props.onChange(event);
    },

    render: function () {
        return (
            <DatePicker
                key="example2"
                dateFormat="YYYY"
                selected={this.state.value}
                onChange={this.handleChange}
                onBlur={this.props.onBlur}
                placeholderText={this.props.placeholderText}/>
        );
    }
});

export default RegisterPiece;
