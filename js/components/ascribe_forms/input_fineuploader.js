'use strict';

import React from 'react';

import ReactS3FineUploader from '../ascribe_uploader/react_s3_fine_uploader';

import AppConstants from '../../constants/application_constants';

import { getCookie } from '../../utils/fetch_api_utils';

let InputFileUploader = React.createClass({
    propTypes: {
        setIsUploadReady: React.PropTypes.func,
        isReadyForFormSubmission: React.PropTypes.func,
        onClick: React.PropTypes.func,
        keyRoutine: React.PropTypes.shape({
            url: React.PropTypes.string,
            fileClass: React.PropTypes.string
        }),
        createBlobRoutine: React.PropTypes.shape({
            url: React.PropTypes.string
        }),
        validation: React.PropTypes.shape({
            itemLimit: React.PropTypes.number,
            sizeLimit: React.PropTypes.string
        }),

        // isFineUploaderActive is used to lock react fine uploader in case
        // a user is actually not logged in already to prevent him from droping files
        // before login in
        isFineUploaderActive: React.PropTypes.bool,
        onLoggedOut: React.PropTypes.func,
        editable: React.PropTypes.bool,
        enableLocalHashing: React.PropTypes.bool,

        // provided by Property
        disabled: React.PropTypes.bool
    },

    getInitialState() {
        return {
            value: null
        };
    },

    submitKey(key){
        this.setState({
            value: key
        });
    },

    reset() {
        this.refs.fineuploader.reset();
    },

    render() {
        let editable = this.props.isFineUploaderActive;

        // if disabled is actually set by property, we want to override
        // isFineUploaderActive
        if(typeof this.props.disabled !== 'undefined') {
            editable = !this.props.disabled;
        }

        return (
            <ReactS3FineUploader
                ref="fineuploader"
                onClick={this.props.onClick}
                keyRoutine={this.props.keyRoutine}
                createBlobRoutine={this.props.createBlobRoutine}
                validation={this.props.validation}
                submitKey={this.submitKey}
                setIsUploadReady={this.props.setIsUploadReady}
                isReadyForFormSubmission={this.props.isReadyForFormSubmission}
                areAssetsDownloadable={false}
                areAssetsEditable={editable}
                signature={{
                    endpoint: AppConstants.serverUrl + 's3/signature/',
                    customHeaders: {
                       'X-CSRFToken': getCookie(AppConstants.csrftoken)
                    }
                }}
                deleteFile={{
                    enabled: true,
                    method: 'DELETE',
                    endpoint: AppConstants.serverUrl + 's3/delete',
                    customHeaders: {
                       'X-CSRFToken': getCookie(AppConstants.csrftoken)
                    }
                }}
                onInactive={this.props.onLoggedOut}
                enableLocalHashing={this.props.enableLocalHashing} />
        );
    }
});

export default InputFileUploader;