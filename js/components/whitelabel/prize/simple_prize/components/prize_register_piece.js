'use strict';

import React from 'react';

import PrizeActions from '../actions/prize_actions';
import PrizeStore from '../stores/prize_store';

import RegisterPiece from '../../../../register_piece';
import Property from '../../../../ascribe_forms/property';
import InputTextAreaToggable from '../../../../ascribe_forms/input_textarea_toggable';
import InputCheckbox from '../../../../ascribe_forms/input_checkbox';

import { getLangText } from '../../../../../utils/lang_utils';
import { setDocumentTitle } from '../../../../../utils/dom_utils';


let PrizeRegisterPiece = React.createClass({
    propTypes: {
        // Provided from PrizeApp
        currentUser: React.PropTypes.object,
        whitelabel: React.PropTypes.object,

        // Provided from router
        location: React.PropTypes.object
    },

    getInitialState() {
        return PrizeStore.getState();
    },

    componentDidMount() {
        PrizeStore.listen(this.onChange);
        PrizeActions.fetchPrize();
    },

    componentWillUnmount() {
        PrizeStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        const { prize } = this.state;

        setDocumentTitle(getLangText('Submit to the prize'));

        if (prize && prize.active) {
            return (
                <RegisterPiece
                    {...this.props}
                    enableLocalHashing={false}
                    headerMessage={''}
                    submitMessage={getLangText('Submit')}>
                    <Property
                        name='artist_statement'
                        label={getLangText('Artist statement')}
                        editable={true}
                        overrideForm={true}>
                        <InputTextAreaToggable
                            rows={1}
                            placeholder={getLangText('Enter your statement')}
                            required />
                    </Property>
                    <Property
                        name='work_description'
                        label={getLangText('Work description')}
                        editable={true}
                        overrideForm={true}>
                        <InputTextAreaToggable
                            rows={1}
                            placeholder={getLangText('Enter the description for your work')}
                            required />
                    </Property>
                    <Property
                        name="terms"
                        className="ascribe-property-collapsible-toggle">
                        <InputCheckbox>
                            <span>
                                {' ' + getLangText('I agree to the Terms of Service the art price') + ' '}
                                (<a href="https://s3-us-west-2.amazonaws.com/ascribe0/whitelabel/sluice/terms.pdf" target="_blank" style={{fontSize: '0.9em', color: 'rgba(0,0,0,0.7)'}}>
                                    {getLangText('read')}
                                </a>)
                            </span>
                        </InputCheckbox>
                    </Property>
                </RegisterPiece>
            );
        } else {
            return (
                <div className='row'>
                    <div style={{textAlign: 'center'}}>
                        {getLangText('The prize is no longer active')}
                    </div>
                </div>
            );
        }
    }
});

export default PrizeRegisterPiece;
