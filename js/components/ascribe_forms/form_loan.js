'use strict';

import React from 'react';

import ApiUrls from '../../constants/api_urls';
import FormMixin from '../../mixins/form_mixin';
import InputText from './input_text';
import InputHidden from './input_hidden';
import InputCheckbox from './input_checkbox';
import InputDate from './input_date';
import InputTextArea from './input_textarea';

import OwnershipFetcher from '../../fetchers/ownership_fetcher';
import ButtonSubmitOrClose from '../ascribe_buttons/button_submit_close';

import { getLangText } from '../../utils/lang_utils.js'

let LoanForm = React.createClass({
    
    getInitialState() {
        this.setState({
            contract_key: null,
            contract_url: null,
            loaneeHasContract: false
        });
    },

    mixins: [FormMixin],

    url() {
        return ApiUrls.ownership_loans;
    },

    getFormData() {
        return {
            bitcoin_id: this.getBitcoinIds().join(),
            loanee: this.refs.loanee.state.value,
            gallery_name: this.refs.gallery_name.state.value,
            startdate: this.refs.startdate.state.value_formatted,
            enddate: this.refs.enddate.state.value_formatted,
            loan_message: this.refs.loan_message.state.value,
            password: this.refs.password.state.value,
            terms: this.refs.terms.state.value
        };
    },

    handleLoanEmailBlur(){
        OwnershipFetcher.fetchLoanContract(this.refs.loanee.state.value)
            .then((res) => {
                if (res && res.length > 0) {
                    this.setState({
                        contract_key: res[0].s3Key,
                        contract_url: res[0].s3Url,
                        loaneeHasContract: true
                    });
                }
                else {
                    this.resetLoanContract();
                }
            })
            .catch((err) => {
                console.log(err);
                this.resetLoanContract();
            });
    },

    resetLoanContract(){
        this.setState({
            contract_key: null,
            contract_url: null,
            loaneeHasContract: false
        });
    },
    
    renderForm() {
        let title = this.getTitlesString().join('');
        let username = this.props.currentUser.username;
        let message =
`${getLangText('Hi')},

${getLangText('I loan')} :
${title}${getLangText('to you')}.

${getLangText('Truly yours')},
${username}`;

        let contract = <InputHidden ref="terms" value="True"/>;
        if (this.state.loaneeHasContract){
            let label = (<div>
                            {getLangText('I agree to the')}&nbsp;
                            <a href={this.state.contract_url} target="_blank">
                                {getLangText('terms of')} {this.refs.loanee.state.value}
                            </a>
                        </div>);
            contract = (<InputCheckbox
                            ref="terms"
                            required="required"
                            label={label}
                        />);
        }

        return (
            <form id="loan_modal_content" role="form" onSubmit={this.submit}>
                <input className="invisible" type="email" name="fake_loanee"/>
                <input className="invisible" type="password" name="fake_password"/>
                <InputText
                    ref="loanee"
                    placeHolder={getLangText('Loanee email')}
                    required="required"
                    type="email"
                    submitted={this.state.submitted}
                    onBlur={this.handleLoanEmailBlur}/>
                <InputText
                    ref="gallery_name"
                    placeHolder={getLangText('Gallery/exhibition (optional)')}
                    required=""
                    type="text"
                    submitted={this.state.submitted}/>
                <div className="row">
                    <div className="col-xs-6">
                        <InputDate
                            ref="startdate"
                            placeholderText={getLangText('Loan start date')} />
                    </div>
                    <div className="col-xs-6 form-group">
                        <InputDate
                            ref="enddate"
                            placeholderText={getLangText('Loan end date')} />
                    </div>
                </div>
                <InputTextArea
                    ref="loan_message"
                    defaultValue={message}
                    required=""
                    />
                <InputText
                    ref="password"
                    placeHolder={getLangText('Password')}
                    required="required"
                    type="password"
                    submitted={this.state.submitted}/>
                {contract}
                <ButtonSubmitOrClose
                    text={getLangText('LOAN')}
                    onClose={this.props.onRequestHide}
                    submitted={this.state.submitted} />
            </form>
        );
    }
});

export default LoanForm;
