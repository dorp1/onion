'use strict';

import React from 'react';

import Form from '../../../../../ascribe_forms/form';
import Property from '../../../../../ascribe_forms/property';

import InputTextAreaToggable from '../../../../../ascribe_forms/input_textarea_toggable';

import GlobalNotificationModel from '../../../../../../models/global_notification_model';
import GlobalNotificationActions from '../../../../../../actions/global_notification_actions';

import ApiUrls from '../../../../../../constants/api_urls';
import AppConstants from '../../../../../../constants/application_constants';

import requests from '../../../../../../utils/requests';

import { getLangText } from '../../../../../../utils/lang_utils';


let IkonotvArtistDetailsForm = React.createClass({
    propTypes: {
        handleSuccess: React.PropTypes.func,
        piece: React.PropTypes.object.isRequired,

        disabled: React.PropTypes.bool,

        isInline: React.PropTypes.bool
    },

    getDefaultProps() {
        return {
            isInline: false
        };
    },

    getFormData() {
        let extradata = {};
        let formRefs = this.refs.form.refs;

        // Put additional fields in extra data object
        Object
            .keys(formRefs)
            .forEach((fieldName) => {
                extradata[fieldName] = formRefs[fieldName].state.value;
            });

        return {
            extradata: extradata,
            piece_id: this.props.piece.id
        };

    },

    handleSuccess() {
        let notification = new GlobalNotificationModel('Artist details successfully updated', 'success', 10000);
        GlobalNotificationActions.appendGlobalNotification(notification);
    },

    render() {
        let buttons, spinner, heading;
        let { isInline, handleSuccess } = this.props;
        

        if(!isInline) {
            buttons = (
                <button
                    type="submit"
                    className="btn ascribe-btn ascribe-btn-login"
                    disabled={this.props.disabled}>
                    {getLangText('Proceed to loan')}
                </button>
            );

            spinner = (
                <div className="modal-footer">
                    <img src={AppConstants.baseUrl + 'static/img/ascribe_animated_small.gif'} />
                </div>
            );

            heading = (
                <div className="ascribe-form-header">
                    <h3>
                        {getLangText('Artist Details')}
                    </h3>
                </div>
            );
        }

        if(this.props.piece && this.props.piece.id && this.props.piece.extra_data) {
            return (
                <Form
                    disabled={this.props.disabled}
                    className="ascribe-form-bordered"
                    ref='form'
                    url={requests.prepareUrl(ApiUrls.piece_extradata, {piece_id: this.props.piece.id})}
                    handleSuccess={handleSuccess || this.handleSuccess}
                    getFormData={this.getFormData}
                    buttons={buttons}
                    spinner={spinner}>
                    {heading}
                    <Property
                        name='artist_website'
                        label={getLangText('Artist Website')}
                        hidden={this.props.disabled && !this.props.piece.extra_data.artist_website}>
                        <InputTextAreaToggable
                            rows={1}
                            defaultValue={this.props.piece.extra_data.artist_website}
                            placeholder={getLangText('The artist\'s website if present...')}/>
                    </Property>
                    <Property
                        name='gallery_website'
                        label={getLangText('Website of related Gallery, Museum, etc.')}
                        hidden={this.props.disabled && !this.props.piece.extra_data.gallery_website}>
                        <InputTextAreaToggable
                            rows={1}
                            defaultValue={this.props.piece.extra_data.gallery_website}
                            placeholder={getLangText('The website of any related Gallery or Museum')}/>
                    </Property>
                    <Property
                        name='additional_websites'
                        label={getLangText('Additional Websites/Publications/Museums/Galleries')}
                        hidden={this.props.disabled && !this.props.piece.extra_data.additional_websites}>
                        <InputTextAreaToggable
                            rows={1}
                            defaultValue={this.props.piece.extra_data.additional_websites}
                            placeholder={getLangText('Enter additional Websites/Publications if any')}/>
                    </Property>
                    <Property
                        name='conceptual_overview'
                        label={getLangText('Short text about the Artist')}
                        hidden={this.props.disabled && !this.props.piece.extra_data.conceptual_overview}>
                        <InputTextAreaToggable
                            rows={1}
                            defaultValue={this.props.piece.extra_data.conceptual_overview}
                            placeholder={getLangText('Enter a short bio about the Artist')}
                            />
                    </Property>
                </Form>
            );
        } else {
            return (
                <div className="ascribe-loading-position">
                    <img src={AppConstants.baseUrl + 'static/img/ascribe_animated_medium.gif'} />
                </div>
            );
        }
    }
});

export default IkonotvArtistDetailsForm;