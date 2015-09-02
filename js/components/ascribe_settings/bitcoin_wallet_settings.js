'use strict';

import React from 'react';

import WalletSettingsStore from '../../stores/wallet_settings_store';
import WalletSettingsActions from '../../actions/wallet_settings_actions';

import Form from '../ascribe_forms/form';
import Property from '../ascribe_forms/property';

import CollapsibleParagraph from '../ascribe_collapsible/collapsible_paragraph';

import AppConstants from '../../constants/application_constants';

import { getLangText } from '../../utils/lang_utils';


let BitcoinWalletSettings = React.createClass({
    propTypes: {
        defaultExpanded: React.PropTypes.bool
    },

    getInitialState() {
        return WalletSettingsStore.getState();
    },

    componentDidMount() {
        WalletSettingsStore.listen(this.onChange);
        WalletSettingsActions.fetchWalletSettings();
    },

    componentWillUnmount() {
        WalletSettingsStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        let content = <img src={AppConstants.baseUrl + 'static/img/ascribe_animated_medium.gif'} />;

        if (this.state.walletSettings.btc_public_key) {
            content = (
                <Form >
                    <Property
                        name='btc_public_key'
                        label={getLangText('Bitcoin public key')}
                        editable={false}>
                        <pre className="ascribe-pre">{this.state.walletSettings.btc_public_key}</pre>
                    </Property>
                    <Property
                        name='btc_root_address'
                        label={getLangText('Root Address')}
                        editable={false}>
                        <pre className="ascribe-pre">{this.state.walletSettings.btc_root_address}</pre>
                    </Property>
                    <hr />
                </Form>);
        }
        return (
            <CollapsibleParagraph
                title={getLangText('Crypto Wallet')}
                show={true}
                defaultExpanded={this.props.defaultExpanded}>
                {content}
            </CollapsibleParagraph>
        );
    }
});

export default BitcoinWalletSettings;