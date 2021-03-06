'use strict';

import React from 'react';

import ListRequestActions from '../../../../ascribe_forms/list_form_request_actions';
import AclButtonList from '../../../../ascribe_buttons/acl_button_list';
import DeleteButton from '../../../../ascribe_buttons/delete_button';

import AclProxy from '../../../../acl_proxy';

import { mergeOptions } from '../../../../../utils/general_utils';


let WalletActionPanel = React.createClass({
    propTypes: {
        piece: React.PropTypes.object.isRequired,
        currentUser: React.PropTypes.object.isRequired,
        handleDeleteSuccess: React.PropTypes.func.isRequired,
        loadPiece: React.PropTypes.func.isRequired,
        submitButtonType: React.PropTypes.func.isRequired
    },

    render() {
        const { currentUser, handleDeleteSuccess, loadPiece, piece, submitButtonType } = this.props;

        if (piece && piece.notifications && piece.notifications.length) {
            return (
                <ListRequestActions
                    pieceOrEditions={piece}
                    currentUser={currentUser}
                    handleSuccess={loadPiece}
                    notifications={piece.notifications}/>);
        } else {

            //We need to disable the normal acl_loan because we're inserting a custom acl_loan button
            let availableAcls;

            if (piece && piece.acl && typeof piece.acl.acl_loan !== 'undefined') {
                // make a copy to not have side effects
                availableAcls = mergeOptions({}, piece.acl);
                availableAcls.acl_loan = false;
            }
            let SubmitButtonType = submitButtonType;

            return (
                <AclButtonList
                    availableAcls={availableAcls}
                    className="text-center ascribe-button-list"
                    currentUser={currentUser}
                    pieceOrEditions={piece}
                    handleSuccess={loadPiece}>
                    <AclProxy
                        aclObject={currentUser.acl}
                        aclName="acl_wallet_submit">
                        <AclProxy
                            aclObject={availableAcls}
                            aclName="acl_wallet_submit">
                            <SubmitButtonType
                                className="btn-sm"
                                piece={piece}/>
                        </AclProxy>
                    </AclProxy>
                    <DeleteButton
                        handleSuccess={handleDeleteSuccess}
                        piece={piece}/>
                </AclButtonList>
            );
        }
    }
});

export default WalletActionPanel;
