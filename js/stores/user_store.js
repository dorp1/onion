'use strict';

import { altUser } from '../alt';

import UserActions from '../actions/user_actions';

import UserSource from '../sources/user_source';


class UserStore {
    constructor() {
        this.currentUser = {};
        this.userMeta = {
            err: null
        };

        this.bindActions(UserActions);
        this.registerAsync(UserSource);
    }

    onFetchCurrentUser(invalidateCache) {
        if (invalidateCache || !this.getInstance().isLoading()) {
            this.getInstance().lookupCurrentUser(invalidateCache);
        }

        // Prevent alt from sending an empty change event when a request is sent
        // off to the source
        this.preventDefault();
    }

    onSuccessFetchCurrentUser({ users: [ user = {} ] }) {
        this.userMeta.err = null;
        this.currentUser = user;
    }

    onLogoutCurrentUser() {
        this.getInstance().performLogoutCurrentUser();

        // Prevent alt from sending an empty change event when a request is sent
        // off to the source
        this.preventDefault();
    }

    onSuccessLogoutCurrentUser() {
        this.userMeta.err = null;
        this.currentUser = {};
    }

    onErrorCurrentUser(err) {
        console.logGlobal(err);
        this.userMeta.err = err;
    }
}

export default altUser.createStore(UserStore, 'UserStore');
