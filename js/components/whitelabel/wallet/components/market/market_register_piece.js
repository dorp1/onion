'use strict';

import React from 'react';
import { History } from 'react-router';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import PieceStore from '../../../../../stores/piece_store';
import PieceActions from '../../../../../actions/piece_actions';

import PieceListStore from '../../../../../stores/piece_list_store';
import PieceListActions from '../../../../../actions/piece_list_actions';

import UserStore from '../../../../../stores/user_store';
import UserActions from '../../../../../actions/user_actions';

import WhitelabelActions from '../../../../../actions/whitelabel_actions';
import WhitelabelStore from '../../../../../stores/whitelabel_store';

import MarketAdditionalDataForm from './market_forms/market_additional_data_form';

import Property from '../../../../ascribe_forms/property';
import RegisterPieceForm from '../../../../ascribe_forms/form_register_piece';

import SlidesContainer from '../../../../ascribe_slides_container/slides_container';

import { getLangText } from '../../../../../utils/lang_utils';
import { setDocumentTitle } from '../../../../../utils/dom_utils';
import { mergeOptions } from '../../../../../utils/general_utils';

let MarketRegisterPiece = React.createClass({
    propTypes: {
        location: React.PropTypes.object
    },

    mixins: [History],

    getInitialState(){
        return mergeOptions(
            PieceListStore.getState(),
            PieceStore.getInitialState(),
            UserStore.getState(),
            WhitelabelStore.getState(),
            {
                step: 0
            });
    },

    componentDidMount() {
        PieceListStore.listen(this.onChange);
        PieceStore.listen(this.onChange);
        UserStore.listen(this.onChange);
        WhitelabelStore.listen(this.onChange);

        UserActions.fetchCurrentUser();
        WhitelabelActions.fetchWhitelabel();

        const queryParams = this.props.location.query;

        // Load the correct piece if the user loads the second step directly
        // by pressing on the back button or using the url
        // We're using 'in' here as we want to know if 'piece_id' is present in the url,
        // we don't care about the value.
        if ('piece_id' in queryParams) {
            PieceActions.fetchPiece(queryParams.piece_id);
        }
    },

    componentWillUnmount() {
        PieceListStore.unlisten(this.onChange);
        PieceStore.unlisten(this.onChange);
        UserStore.unlisten(this.onChange);
        WhitelabelStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);
    },

    handleRegisterSuccess(response) {
        this.refreshPieceList();

        // Also load the newly registered piece for the next step
        if (response && response.piece) {
            PieceActions.updatePiece(response.piece);
        }

        this.nextSlide({ piece_id: response.piece.id });
    },

    handleAdditionalDataSuccess() {
        this.refreshPieceList();

        this.history.push('/collection');
    },

    nextSlide(queryParams) {
        // We need to increase the step to lock the forms that are already filled out
        this.setState({
            step: this.state.step + 1
        });

        this.refs.slidesContainer.nextSlide(queryParams);
    },

    refreshPieceList() {
        PieceListActions.fetchPieceList(
            this.state.page,
            this.state.pageSize,
            this.state.searchTerm,
            this.state.orderBy,
            this.state.orderAsc,
            this.state.filterBy
        );
    },

    render() {
        const { location } = this.props;
        const {
            piece,
            step,
            whitelabel: {
                name: whitelabelName = 'Market'
            } } = this.state;

        setDocumentTitle(getLangText('Register a new piece'));

        return (
            <SlidesContainer
                ref="slidesContainer"
                forwardProcess={true}
                glyphiconClassNames={{
                    pending: 'glyphicon glyphicon-chevron-right',
                    completed: 'glyphicon glyphicon-lock'
                }}
                location={location}>
                <div data-slide-title={getLangText('Register work')}>
                    <Row className="no-margin">
                        <Col xs={12} sm={10} md={8} smOffset={1} mdOffset={2}>
                            <RegisterPieceForm
                                disabled={step > 0}
                                enableLocalHashing={false}
                                headerMessage={getLangText('Consign to %s', whitelabelName)}
                                submitMessage={getLangText('Proceed to additional details')}
                                isFineUploaderActive={true}
                                enableSeparateThumbnail={false}
                                handleSuccess={this.handleRegisterSuccess}
                                location={location}>
                                <Property
                                    name="num_editions"
                                    label={getLangText('Specify editions')}>
                                    <input
                                        type="number"
                                        placeholder="(e.g. 32)"
                                        min={0}
                                        required />
                                </Property>
                            </RegisterPieceForm>
                        </Col>
                    </Row>
                </div>
                <div data-slide-title={getLangText('Additional details')}>
                    <Row className="no-margin">
                        <Col xs={12} sm={10} md={8} smOffset={1} mdOffset={2}>
                            <MarketAdditionalDataForm
                                extraData={piece.extra_data}
                                handleSuccess={this.handleAdditionalDataSuccess}
                                otherData={piece.other_data}
                                pieceId={piece.id}
                                showHeading />
                        </Col>
                    </Row>
                </div>
            </SlidesContainer>
        );
    }
});

export default MarketRegisterPiece;
