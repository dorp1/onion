'use strict';

import React from 'react';

import requests from '../../utils/requests';
import { getLangText } from '../../utils/lang_utils.js';

import ApiUrls from '../../constants/api_urls';

import Form from './form';
import Property from './property';
import InputTextAreaToggable from './input_textarea_toggable';

let PieceExtraDataForm = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        pieceId: React.PropTypes.number.isRequired,

        convertLinks: React.PropTypes.bool,
        editable: React.PropTypes.bool,
        extraData: React.PropTypes.object,
        handleSuccess: React.PropTypes.func,
        title: React.PropTypes.string
    },

    getFormData() {
        return {
            extradata: {
                [this.props.name]: this.refs.form.refs[this.props.name].state.value
            },
            piece_id: this.props.pieceId
        };
    },

    render() {
        const { convertLinks, editable, extraData, handleSuccess, name, pieceId, title } = this.props;
        const defaultValue = (extraData && extraData[name]) || null;

        if (!defaultValue && !editable) {
            return null;
        }

        return (
            <Form
                ref='form'
                disabled={!editable}
                getFormData={this.getFormData}
                handleSuccess={handleSuccess}
                url={requests.prepareUrl(ApiUrls.piece_extradata, { piece_id: pieceId })}>
                <Property
                    name={name}
                    label={title}>
                    <InputTextAreaToggable
                        rows={1}
                        convertLinks={convertLinks}
                        defaultValue={defaultValue}
                        placeholder={getLangText('Fill in%s', ' ') + title}
                        required />
                </Property>
                <hr />
            </Form>
        );
    }
});


export default PieceExtraDataForm;
