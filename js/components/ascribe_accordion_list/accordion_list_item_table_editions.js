'use strict';

import React from 'react';

import EditionListStore from '../../stores/edition_list_store';
import EditionListActions from '../../actions/edition_list_actions';
import PieceListActions from '../../actions/piece_list_actions';

import AccordionListItemTable from './accordion_list_item_table';
import AccordionListItemTableToggle from './accordion_list_item_table_toggle';
import AccordionListItemTableSelectAllEditionsCheckbox from './accordion_list_item_table_select_all_editions_checkbox';

import { ColumnModel, TransitionModel } from '../ascribe_table/models/table_models';

import TableItemText from '../ascribe_table/table_item_text';
import TableItemCheckbox from '../ascribe_table/table_item_checkbox';
import TableItemAclFiltered from '../ascribe_table/table_item_acl_filtered';

import { getLangText } from '../../utils/lang_utils';

let AccordionListItemTableEditions = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        parentId: React.PropTypes.number,
        show: React.PropTypes.bool
    },

    getInitialState() {
        return EditionListStore.getState();
    },

    componentDidMount() {
        EditionListStore.listen(this.onChange);
    },

    componentWillUnmount() {
        EditionListStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    selectItem(pieceId, editionId, toValue) {
        EditionListActions.selectEdition({pieceId, editionId, toValue});
    },

    toggleAllItems(checked) {
        this.state.editionList[this.props.parentId]
            .forEach((edition) => {
                this.selectItem(this.props.parentId, edition.id, !checked);
            });
    },

    filterSelectedEditions() {
        let selectedEditions = this.state.editionList[this.props.parentId]
            .filter((edition) => edition.selected);
        return selectedEditions;
    },

    toggleTable() {
        PieceListActions.showEditionList(this.props.parentId);
        EditionListActions.fetchEditionList(this.props.parentId);
    },

    changeEditionListOrder(orderBy, orderAsc) {
        EditionListActions.fetchEditionList(this.props.parentId, orderBy, orderAsc);
    },

    render() {
        let selectedEditionsCount = 0;
        let allEditionsCount = 0;
        let orderBy;
        let orderAsc;

        // here we need to check if all editions of a specific
        // piece are already defined. Otherwise .length will throw an error and we'll not
        // be notified about it.
        if(this.state.editionList[this.props.parentId]) {
            selectedEditionsCount = this.filterSelectedEditions().length;
            allEditionsCount = this.state.editionList[this.props.parentId].length;
            orderBy = this.state.editionList[this.props.parentId].orderBy;
            orderAsc = this.state.editionList[this.props.parentId].orderAsc;
        }

        let transition = new TransitionModel('edition', 'editionId', 'bitcoin_id');

        let columnList = [
            new ColumnModel(
                (item) => {
                    return {
                        'editionId': item.id,
                        'pieceId': this.props.parentId,
                        'selectItem': this.selectItem,
                        'selected': item.selected
                    }; },
                    '',
                    <AccordionListItemTableSelectAllEditionsCheckbox
                        onChange={this.toggleAllItems}
                        numOfSelectedEditions={selectedEditionsCount}
                        numOfAllEditions={allEditionsCount}/>,
                    TableItemCheckbox,
                    1,
                    false
            ),
            new ColumnModel(
                (item) => {
                    return {
                        'content': item.edition_number + ' of ' + item.num_editions
                    }; },
                    'edition_number',
                    'Edition',
                    TableItemText,
                    1,
                    true,
                    transition
            ),
            new ColumnModel(
                (item) => {
                    return {
                        'content': item.bitcoin_id
                    }; },
                    'bitcoin_id',
                    getLangText('Bitcoin Address'),
                    TableItemText,
                    5,
                    true,
                    transition
            ),
            new ColumnModel(
                (item) => {
                    return {
                        'content': item.acl
                    }; },
                    'acl',
                    getLangText('Actions'),
                    TableItemAclFiltered,
                    4,
                    false,
                    transition
            )
        ];

        return (
            <div>
                <AccordionListItemTable
                    className={this.props.className}
                    parentId={this.props.parentId}
                    itemList={this.state.editionList[this.props.parentId]}
                    columnList={columnList}
                    numOfTableItems={this.props.numOfEditions}
                    show={this.props.show}
                    orderBy={orderBy}
                    orderAsc={orderAsc}
                    changeOrder={this.changeEditionListOrder}>
                    <AccordionListItemTableToggle
                        className="ascribe-accordion-list-table-toggle"
                        onClick={this.toggleTable}
                        show={this.props.show} />
                </AccordionListItemTable>
                
            </div>
        );
    }
});

export default AccordionListItemTableEditions;