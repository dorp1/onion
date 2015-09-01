'use strict';

import React from 'react';
import PieceList from '../../../../piece_list';

import UserActions from '../../../../../actions/user_actions';
import UserStore from '../../../../../stores/user_store';

import CylandAccordionListItem from './ascribe_accordion_list/cyland_accordion_list_item';


let CylandPieceList = React.createClass({
    getInitialState() {
        return UserStore.getState();
    },

    componentDidMount() {
        UserStore.listen(this.onChange);
        UserActions.fetchCurrentUser();
    },

    componentWillUnmount() {
        UserStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    render() {
        return (
            <div>
                <PieceList
                    redirectTo="register_piece"
                    accordionListItemType={CylandAccordionListItem}
                    />
            </div>
        );
    }
});

export default CylandPieceList;