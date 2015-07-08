'use strict';

import React from 'react';

import ApiUrls from '../../constants/api_urls';
import FormMixin from '../../mixins/form_mixin';
import InputText from './input_text';
import InputTextArea from './input_textarea';
import ButtonSubmitOrClose from '../ascribe_buttons/button_submit_close';
import { getLangText } from '../../utils/lang_utils.js'

let ConsignForm = React.createClass({
    mixins: [FormMixin],


    url() {
        return ApiUrls.ownership_consigns;
    },
    
    getFormData() {
        return {
            bitcoin_id: this.getBitcoinIds().join(),
            consignee: this.refs.consignee.state.value,
            consign_message: this.refs.consign_message.state.value,
            password: this.refs.password.state.value
        };
    },

    renderForm() {
        let title = this.getTitlesString().join('');
        let username = this.props.currentUser.username;
        let message =
`${getLangText('Hi')},

${getLangText('I consign')} :
${title}${getLangText('to you')}.

${getLangText('Truly yours')},
${username}`;

        return (
            <form id="consign_modal_content" role="form" onSubmit={this.submit}>
                <input className="invisible" type="email" name="fake_consignee"/>
                <input className="invisible" type="password" name="fake_password"/>
                <InputText
                    ref="consignee"
                    placeHolder={getLangText('Consignee email')}
                    required="required"
                    type="email"
                    submitted={this.state.submitted}/>
                <InputTextArea
                    ref="consign_message"
                    defaultValue={message}
                    required=""
                    />
                <InputText
                    ref="password"
                    placeHolder={getLangText('Password')}
                    required="required"
                    type="password"
                    submitted={this.state.submitted}/>
               <ButtonSubmitOrClose
                    text={getLangText('CONSIGN')}
                    onClose={this.props.onRequestHide}
                    submitted={this.state.submitted} />
            </form>
        );
    }
});

export default ConsignForm;