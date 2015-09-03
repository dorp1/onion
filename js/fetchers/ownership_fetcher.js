'use strict';

import requests from '../utils/requests';

import ApiUrls from '../constants/api_urls';

let OwnershipFetcher = {
    /**
     * Fetch the default, public contract of a user from the API.
     */
    fetchContract(email) {
        return requests.get(ApiUrls.blob_contracts + '?loanee=' + email);
    },

    /**
     * Fetch the contracts of the logged-in user from the API.
     */
    fetchContractList(){
        return requests.get(ApiUrls.ownership_contract_list);
    },

    fetchLoanPieceRequestList(){
        return requests.get(ApiUrls.ownership_loans_pieces_request);
    },

    makeContractPublic(contractObj){
        console.log(contractObj);
        return requests.put('ownership_contract_list',{ body: contractObj, contract_id:contractObj.id });
    }
};

export default OwnershipFetcher;
