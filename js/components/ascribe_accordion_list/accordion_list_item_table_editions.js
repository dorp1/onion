'use strict';

import React from 'react';

import EditionListStore from '../../stores/edition_list_store';
import EditionListActions from '../../actions/edition_list_actions';

import AccordionListItemTable from './accordion_list_item_table';
import AccordionListItemTableToggle from './accordion_list_item_table_toggle';
import AccordionListItemTableSelectAllEditionsCheckbox from './accordion_list_item_table_select_all_editions_checkbox';

import { ColumnModel, TransitionModel } from '../ascribe_table/models/table_models';

import TableItemText from '../ascribe_table/table_item_text';
import TableItemCheckbox from '../ascribe_table/table_item_checkbox';
import TableItemAclFiltered from '../ascribe_table/table_item_acl_filtered';
import AscribeSpinner from '../ascribe_spinner';

import { getLangText } from '../../utils/lang_utils';
import { mergeOptions } from '../../utils/general_utils';


let AccordionListItemTableEditions = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        parentId: React.PropTypes.number
    },

    getInitialState() {
        return mergeOptions(
            EditionListStore.getState(),
            {
                showMoreLoading: false
            }
        );
    },

    componentDidMount() {
        EditionListStore.listen(this.onChange);
    },

    componentWillUnmount() {
        EditionListStore.unlisten(this.onChange);
    },

    onChange(state) {
        if(this.state.showMoreLoading) {
            this.setState({
                showMoreLoading: false
            });
        }

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
        return this.state
                   .editionList[this.props.parentId]
                   .filter((edition) => edition.selected);
    },

    loadFurtherEditions() {
        const { parentId: pieceId } = this.props;
        const { page, pageSize, orderBy, orderAsc, filterBy } = this.state.editionList[pieceId];

        // trigger loading animation
        this.setState({
            showMoreLoading: true
        });

        EditionListActions.fetchEditionList({
            pieceId,
            pageSize,
            orderBy,
            orderAsc,
            filterBy,
            page: page + 1
        });
    },
    render() {
        const { className, parentId } = this.props;
        const { editionList, isEditionListOpenForPieceId, showMoreLoading } = this.state;
        const editionsForPiece = editionList[parentId];

        let selectedEditionsCount = 0;
        let allEditionsCount = 0;
        let orderBy;
        let orderAsc;
        let show = false;
        let showExpandOption = false;

        // here we need to check if all editions of a specific
        // piece are already defined. Otherwise .length will throw an error and we'll not
        // be notified about it.
        if (editionsForPiece) {
            selectedEditionsCount = this.filterSelectedEditions().length;
            allEditionsCount = editionsForPiece.length;
            orderBy = editionsForPiece.orderBy;
            orderAsc = editionsForPiece.orderAsc;
        }

        if (parentId in isEditionListOpenForPieceId) {
            show = isEditionListOpenForPieceId[parentId].show;
        }

        // if the number of editions in the array is equal to the maximum number of editions,
        // then the "Show me more" dialog should be hidden from the user's view
        if (editionsForPiece && editionsForPiece.count > editionsForPiece.length) {
            showExpandOption = true;
        }

        const transition = new TransitionModel({
            to: 'editions',
            queryKey: 'editionId',
            valueKey: 'bitcoin_id',
            callback: (e) => e.stopPropagation()
        });

        const columnList = [
            new ColumnModel({
                transformFn: (item) => {
                    return {
                        'editionId': item.id,
                        'pieceId': parentId,
                        'selectItem': this.selectItem,
                        'selected': item.selected
                    };
                },
                displayElement: (
                    <AccordionListItemTableSelectAllEditionsCheckbox
                        onChange={this.toggleAllItems}
                        numOfSelectedEditions={selectedEditionsCount}
                        numOfAllEditions={allEditionsCount}/>
                ),
                displayType: TableItemCheckbox,
                rowWidth: 1
            }),
            new ColumnModel({
                transition,
                transformFn: (item) => {
                    return {
                        'content': item.edition_number + ' ' + getLangText('of') + ' ' + item.num_editions
                    };
                },
                columnName: 'edition_number',
                displayElement: getLangText('Edition'),
                displayType: TableItemText,
                rowWidth: 1
            }),
            new ColumnModel({
                transition,
                transformFn: (item) => {
                    return {
                        'content': item.bitcoin_id
                    };
                },
                columnName: 'bitcoin_id',
                displayElement: getLangText('ID'),
                displayType: TableItemText,
                rowWidth: 5,
                className: 'hidden-xs visible-sm visible-md visible-lg'
            }),
            new ColumnModel({
                transition,
                transformFn: (item) => {
                    return {
                        'content': item.acl,
                        'notifications': item.notifications
                    };
                },
                columnName: 'acl',
                displayElement: getLangText('Actions'),
                displayType: TableItemAclFiltered,
                rowWidth: 4
            })
        ];

        if (show && editionsForPiece && editionsForPiece.length) {
            return (
                <div className={className}>
                    <AccordionListItemTable
                        parentId={parentId}
                        itemList={editionsForPiece}
                        columnList={columnList}
                        show={show}
                        orderBy={orderBy}
                        orderAsc={orderAsc}
                        changeOrder={this.changeEditionListOrder}
                        selectItem={this.selectItem}/>
                    <AccordionListItemTableToggle
                        className="ascribe-accordion-list-table-toggle"
                        onClick={this.loadFurtherEditions}
                        message={show && showExpandOption ? (
                                <span>
                                    {showMoreLoading ? <AscribeSpinner size="sm" color="dark-blue" />
                                                     : <span className="glyphicon glyphicon-option-horizontal" aria-hidden="true" style={{top: 3}} />}
                                    {getLangText('Show me more')}
                                </span>
                            ) : null
                        } />
                </div>
            );
        } else {
            return null;
        }
    }
});

export default AccordionListItemTableEditions;
