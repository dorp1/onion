'use strict';

import AppConstants from './application_constants';

import getPrizeApiUrls from '../components/whitelabel/prize/constants/prize_api_urls';
import getWalletApiUrls from '../components/whitelabel/wallet/constants/wallet_api_urls';

import { update } from '../utils/general_utils';


let ApiUrls = {
    'applications': AppConstants.apiEndpoint + 'applications/',
    'application_token_refresh': AppConstants.apiEndpoint + 'applications/refresh_token/',
    'blob_digitalworks': AppConstants.apiEndpoint + 'blob/digitalworks/',
    'blob_otherdatas': AppConstants.apiEndpoint + 'blob/otherdatas/',
    'blob_contracts': AppConstants.apiEndpoint + 'blob/contracts/',
    'blob_thumbnails': AppConstants.apiEndpoint + 'blob/thumbnails/',
    'coa': AppConstants.apiEndpoint + 'coa/${id}/',
    'coa_create': AppConstants.apiEndpoint + 'coa/',
    'coa_verify': AppConstants.apiEndpoint + 'coa/verify_coa/',
    'edition': AppConstants.apiEndpoint + 'editions/${bitcoin_id}/',
    'edition_delete': AppConstants.apiEndpoint + 'editions/${edition_id}/',
    'edition_remove_from_collection': AppConstants.apiEndpoint + 'ownership/shares/editions/${edition_id}/',
    'editions': AppConstants.apiEndpoint + 'editions/', // this should be moved to the one below
    'editions_list': AppConstants.apiEndpoint + 'pieces/${piece_id}/editions/',
    'licenses': AppConstants.apiEndpoint + 'ownership/licenses/',
    'note_private_edition': AppConstants.apiEndpoint + 'note/private/editions/',
    'note_private_piece': AppConstants.apiEndpoint + 'note/private/pieces/',
    'note_public_edition': AppConstants.apiEndpoint + 'note/public/editions/',
    'note_public_piece': AppConstants.apiEndpoint + 'note/public/pieces/',
    'notification_piecelist': AppConstants.apiEndpoint + 'notifications/pieces/',
    'notification_piece': AppConstants.apiEndpoint + 'notifications/pieces/${piece_id}/',
    'notification_editionlist': AppConstants.apiEndpoint + 'notifications/editions/',
    'notification_edition': AppConstants.apiEndpoint + 'notifications/editions/${edition_id}/',
    'notification_contractagreementlist': AppConstants.apiEndpoint + 'notifications/contract_agreements/',
    'ownership_contract_agreements': AppConstants.apiEndpoint + 'ownership/contract_agreements/',
    'ownership_contract_agreements_confirm': AppConstants.apiEndpoint + 'ownership/contract_agreements/${contract_agreement_id}/accept/',
    'ownership_contract_agreements_deny': AppConstants.apiEndpoint + 'ownership/contract_agreements/${contract_agreement_id}/reject/',
    'ownership_consigns': AppConstants.apiEndpoint + 'ownership/consigns/',
    'ownership_consigns_confirm': AppConstants.apiEndpoint + 'ownership/consigns/confirm/',
    'ownership_consigns_deny': AppConstants.apiEndpoint + 'ownership/consigns/deny/',
    'ownership_consigns_withdraw': AppConstants.apiEndpoint + 'ownership/consigns/withdraw/',
    'ownership_loans_pieces': AppConstants.apiEndpoint + 'ownership/loans/pieces/',
    'ownership_loans_pieces_confirm': AppConstants.apiEndpoint + 'ownership/loans/pieces/confirm/',
    'ownership_loans_pieces_deny': AppConstants.apiEndpoint + 'ownership/loans/pieces/deny/',
    'ownership_loans_pieces_request': AppConstants.apiEndpoint + 'ownership/loans/pieces/request/',
    'ownership_loans_pieces_request_confirm': AppConstants.apiEndpoint + 'ownership/loans/pieces/request_confirm/',
    'ownership_loans_pieces_request_deny': AppConstants.apiEndpoint + 'ownership/loans/pieces/request_deny/',
    'ownership_loans_editions': AppConstants.apiEndpoint + 'ownership/loans/editions/',
    'ownership_loans_confirm': AppConstants.apiEndpoint + 'ownership/loans/editions/confirm/',
    'ownership_loans_deny': AppConstants.apiEndpoint + 'ownership/loans/editions/deny/',
    'ownership_shares_editions': AppConstants.apiEndpoint + 'ownership/shares/editions/',
    'ownership_shares_pieces': AppConstants.apiEndpoint + 'ownership/shares/pieces/',
    'ownership_transfers': AppConstants.apiEndpoint + 'ownership/transfers/',
    'ownership_transfers_withdraw': AppConstants.apiEndpoint + 'ownership/transfers/withdraw/',
    'ownership_unconsigns': AppConstants.apiEndpoint + 'ownership/unconsigns/',
    'ownership_unconsigns_deny': AppConstants.apiEndpoint + 'ownership/unconsigns/deny/',
    'ownership_unconsigns_request': AppConstants.apiEndpoint + 'ownership/unconsigns/request/',
    'ownership_contract': AppConstants.apiEndpoint + 'ownership/contracts/${contract_id}/',
    'ownership_contract_list': AppConstants.apiEndpoint + 'ownership/contracts/',
    'piece': AppConstants.apiEndpoint + 'pieces/${piece_id}/',
    'piece_extradata': AppConstants.apiEndpoint + 'pieces/${piece_id}/extradata/',
    'pieces_list': AppConstants.apiEndpoint + 'pieces/',
    'piece_remove_from_collection': AppConstants.apiEndpoint + 'ownership/shares/pieces/${piece_id}/',
    'user': AppConstants.apiEndpoint + 'users/',
    'users_login': AppConstants.apiEndpoint + 'users/login/',
    'users_logout': AppConstants.apiEndpoint + 'users/logout/',
    'users_password_reset': AppConstants.apiEndpoint + 'users/reset_password/',
    'users_password_reset_request': AppConstants.apiEndpoint + 'users/request_reset_password/',
    'users_signup': AppConstants.apiEndpoint + 'users/',
    'users_username': AppConstants.apiEndpoint + 'users/username/',
    'users_profile': AppConstants.apiEndpoint + 'users/profile/',
    'wallet_settings': AppConstants.apiEndpoint + 'users/wallet_settings/',
    'webhook': AppConstants.apiEndpoint + 'webhooks/${webhook_id}/',
    'webhooks': AppConstants.apiEndpoint + 'webhooks/',
    'webhooks_events': AppConstants.apiEndpoint + 'webhooks/events/',
    'whitelabel_settings': AppConstants.apiEndpoint + 'whitelabel/settings/${subdomain}/',
    'delete_s3_file': AppConstants.serverUrl + 's3/delete/',
    'sign_url_s3': AppConstants.serverUrl + 's3/sign_url/'
};


export function updateApiUrls(type, subdomain) {
    let newUrls = {};

    if (type === 'prize') {
        newUrls = getPrizeApiUrls(subdomain);
    } else if(type === 'wallet') {
        newUrls = getWalletApiUrls(subdomain);
    }
    update(ApiUrls, newUrls);
}

export default ApiUrls;
