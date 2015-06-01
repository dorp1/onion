import React from 'react';

import EditionListStore from '../../stores/edition_list_store';
import EditionListActions from '../../actions/edition_list_actions';

import AclButton from '../acl_button';
import PieceListToolbarSelectedEditionsWidget from './piece_list_toolbar_selected_editions_widget';

let PieceListToolbar = React.createClass({
    propTypes: {
        className: React.PropTypes.string
    },

    getInitialState() {
        return EditionListStore.getState();
    },

    onChange(state) {
        this.setState(state);
    },

    componentDidMount() {
        EditionListStore.listen(this.onChange)
    },

    componentDidUnmount() {
        EditionListStore.unlisten(this.onChange)
    },

    filterForSelected(edition) {
        return edition.selected;
    },

    fetchSelectedEditionList() {
        let selectedEditionList = [];

        Object
            .keys(this.state.editionList)
            .forEach((key) => {
                let filteredEditionsForPiece = this.state.editionList[key].filter(this.filterForSelected);
                selectedEditionList = selectedEditionList.concat(filteredEditionsForPiece);
            });

        return selectedEditionList;
    },

    intersectAcls(a, b) {
        return a.filter((val) => b.indexOf(val) > -1);
    },

    bulk(action) {
        console.log(action);
    },

    getAvailableAcls() {
        let availableAcls = [];
        let selectedEditionList = this.fetchSelectedEditionList();

        // If no edition has been selected, availableActions is empty
        // If only one edition has been selected, their actions are available
        // If more than one editions have been selected, their acl properties are intersected
        if(selectedEditionList.length >= 1) {
            availableAcls = selectedEditionList[0].acl;
        }
        if(selectedEditionList.length >= 2) {
            for(let i = 1; i < selectedEditionList.length; i++) {
                availableAcls = this.intersectAcls(availableAcls, selectedEditionList[i].acl);
            }
        }
        
        return availableAcls;
    },

    clearAllSelections() {
        EditionListActions.clearAllEditionSelections();
    },

    render() {
        let availableAcls = this.getAvailableAcls();

        if(availableAcls.length > 0) {
            return (
                <div className={this.props.className}>
                    <div className="row no-margin">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 piece-list-toolbar">
                            <p></p>
                            <div className="row">
                                <div className="text-center">
                                    <PieceListToolbarSelectedEditionsWidget
                                        numberOfSelectedEditions={this.fetchSelectedEditionList().length} />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span 
                                        className="piece-list-toolbar-clear-all"
                                        onClick={this.clearAllSelections}>clear all</span>
                                </div>
                            </div>
                            <p></p>
                            <div className="row">
                                <div className="text-center">
                                    <AclButton availableAcls={availableAcls} action="transfer" actionFunction={this.bulk} />
                                    <AclButton availableAcls={availableAcls} action="consign" actionFunction={this.bulk} />
                                    <AclButton availableAcls={availableAcls} action="share" actionFunction={this.bulk} />
                                    <AclButton availableAcls={availableAcls} action="loan" actionFunction={this.bulk} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        } 
        
    }
});

export default PieceListToolbar;