'use strict';

import React from 'react';

import CollapsibleParagraph from '../ascribe_collapsible/collapsible_paragraph';
import CreateContractForm from '../ascribe_forms/form_create_contract';

import ContractListStore from '../../stores/contract_list_store';
import ContractListActions from '../../actions/contract_list_actions';

import ActionPanel from '../ascribe_panel/action_panel';

import { getLangText } from '../../utils/lang_utils';
import GlobalNotificationModel from '../../models/global_notification_model';
import GlobalNotificationActions from '../../actions/global_notification_actions';

let ContractSettings = React.createClass({
    propTypes: {
        defaultExpanded: React.PropTypes.bool
    },
    getInitialState(){
        return ContractListStore.getState();
    },
    componentDidMount() {
        ContractListStore.listen(this.onChange);
        ContractListActions.fetchContractList();
    },
    componentWillUnmount() {
        ContractListStore.unlisten(this.onChange);
    },
    onChange(state) {
        this.setState(state);
    },
    makeContractPublic(contract){
        ContractListActions.makeContractPublic(contract)
            .then(( ) => ContractListActions.fetchContractList())
            .catch((error)=>{
                let notification = new GlobalNotificationModel(error, 'danger', 10000);
                GlobalNotificationActions.appendGlobalNotification(notification);
        });
    },
    removeContract(contract){
        console.log(contract);
        ContractListActions.removeContract(contract.id)
            .then(( ) => ContractListActions.fetchContractList())
            .catch((error) => {
                console.log('Error', error);
                let notification = new GlobalNotificationModel(error, 'danger', 10000);
                GlobalNotificationActions.appendGlobalNotification(notification);
        });
    },
    getPublicContracts(){
        return this.state.contractList.filter((contract) => contract.public);
    },
    getPrivateContracts(){
        return this.state.contractList.filter((contract) => !contract.public);
    },
    getblobEndName(contract){
        return contract.blob.match(/.*\/(.*)/)[1];
    },
    render() {
        let publicContracts = this.getPublicContracts();
        let privateContracts = this.getPrivateContracts();

        return (
            <CollapsibleParagraph
                title={getLangText('Contract Settings')}
                show={true}
                defaultExpanded={true}>
                <CollapsibleParagraph
                    title={getLangText('List Contracts')}
                    show={true}
                    defaultExpanded={true}>
                    <CollapsibleParagraph
                        title={getLangText('Public Contracts')}
                        show={true}
                        defaultExpanded={true}>
                        {publicContracts.map((contract) => {
                            return (
                                <ActionPanel
                                    title={contract.name}
                                    content={contract.name}
                                    buttons={
                                        <div className="pull-right">
                                           <button className="btn btn-default btn-sm margin-left-2px">
                                                UPDATE
                                           </button>
                                           <button className="btn btn-default btn-sm margin-left-2px"
                                            onClick={this.removeContract.bind(this, contract)}>
                                                REMOVE
                                            </button>
                                       </div>
                                    }
                                    leftColumnWidth="40%"
                                    rightColumnWidth="60%"
                                />
                            );
                        })}
                    </CollapsibleParagraph>
                    <CollapsibleParagraph
                        title={getLangText('Private Contracts')}
                        show={true}
                        defaultExpanded={true}>
                        {privateContracts.map((contract) => {
                            return (
                                <ActionPanel
                                    title={contract.name}
                                    content={contract.name}
                                    buttons={
                                        <div className="pull-right">
                                           <button className="btn btn-default btn-sm margin-left-2px">
                                                UPDATE
                                            </button>
                                            <button className="btn btn-default btn-sm margin-left-2px"
                                            onClick={this.removeContract.bind(this, contract)}>
                                                REMOVE
                                            </button>
                                            <button className="btn btn-default btn-sm margin-left-2px"
                                            onClick={this.makeContractPublic.bind(this, contract)}>
                                                MAKE PUBLIC
                                            </button>
                                       </div>
                                   }
                                   leftColumnWidth="40%"
                                   rightColumnWidth="60%"/>
                            );
                        })}
                    </CollapsibleParagraph>
                </CollapsibleParagraph>
                <CollapsibleParagraph
                    title={getLangText('Create Contract')}
                    show={true}
                    defaultExpanded={true}>
                    <CreateContractForm />
                </CollapsibleParagraph>
            </CollapsibleParagraph>
        );
    }
});

export default ContractSettings;