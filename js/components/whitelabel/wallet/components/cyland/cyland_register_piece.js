'use strict';

import React from 'react';
import Router from 'react-router';

import Moment from 'moment';

import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import RegisterPieceForm from '../../../../ascribe_forms/form_register_piece';

import Property from '../../../../ascribe_forms/property';
import InputCheckbox from '../../../../ascribe_forms/input_checkbox';

import PieceListStore from '../../../../../stores/piece_list_store';
import PieceListActions from '../../../../../actions/piece_list_actions';

import UserStore from '../../../../../stores/user_store';
import UserActions from '../../../../../actions/user_actions';

import PieceStore from '../../../../../stores/piece_store';
import PieceActions from '../../../../../actions/piece_actions';

import GlobalNotificationModel from '../../../../../models/global_notification_model';
import GlobalNotificationActions from '../../../../../actions/global_notification_actions';

import CylandAdditionalDataForm from '../ascribe_forms/cyland_additional_data_form';

import LoanForm from '../../../../ascribe_forms/form_loan';

import SlidesContainer from '../../../../ascribe_slides_container/slides_container';

import ApiUrls from '../../../../../constants/api_urls';

import { getLangText } from '../../../../../utils/lang_utils';
import { mergeOptions } from '../../../../../utils/general_utils';
import { getAclFormMessage } from '../../../../../utils/form_utils';

let CylandRegisterPiece = React.createClass({

    mixins: [Router.Navigation],

    getInitialState(){
        return mergeOptions(
            UserStore.getState(),
            PieceListStore.getState(),
            PieceStore.getState(),
            {
                selectedLicense: 0,
                isFineUploaderActive: false
            });
    },

    componentDidMount() {
        PieceListStore.listen(this.onChange);
        UserStore.listen(this.onChange);
        PieceStore.listen(this.onChange);

        UserActions.fetchCurrentUser();
    },

    componentWillUnmount() {
        PieceListStore.unlisten(this.onChange);
        UserStore.unlisten(this.onChange);
        PieceStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);

        if(this.state.currentUser && this.state.currentUser.email) {
            // we should also make the fineuploader component editable again
            this.setState({
                isFineUploaderActive: true
            });
        }
    },

    handleRegisterSuccess(response){

        // once the user was able to register a piece successfully, we need to make sure to keep
        // the piece list up to date
        PieceListActions.fetchPieceList(
            this.state.page,
            this.state.pageSize,
            this.state.searchTerm,
            this.state.orderBy,
            this.state.orderAsc,
            this.state.filterBy
        );

        // also start loading the piece for the next step
        if(response && response.piece) {
            PieceActions.updatePiece(response.piece);
        }

        this.refs.slidesContainer.setSlideNum(1);
    },

    handleAdditionalDataSuccess() {
        this.refs.slidesContainer.setSlideNum(2);
    },

    changeSlide() {
        // only transition to the login store, if user is not logged in
        // ergo the currentUser object is not properly defined
        if(this.state.currentUser && !this.state.currentUser.email) {
            this.onLoggedOut();
        }
    },

    // basically redirects to the second slide (index: 1), when the user is not logged in
    onLoggedOut() {
        this.transitionTo('login');
    },

    render() {

        let today = new Moment();
        let datetimeWhenWeAllWillBeFlyingCoolHoverboardsAndDinosaursWillLiveAgain = new Moment();
        datetimeWhenWeAllWillBeFlyingCoolHoverboardsAndDinosaursWillLiveAgain.add(1000, 'years');

        return (
            <SlidesContainer ref="slidesContainer">
                <div>
                    <Row className="no-margin">
                        <Col xs={12} sm={10} md={8} smOffset={1} mdOffset={2}>
                            <RegisterPieceForm
                                enableLocalHashing={false}
                                headerMessage={getLangText('Submit to Cyland Archive')}
                                submitMessage={getLangText('Submit')}
                                isFineUploaderActive={this.state.isFineUploaderActive}
                                handleSuccess={this.handleRegisterSuccess}
                                onLoggedOut={this.onLoggedOut}>
                                <Property
                                    name="terms"
                                    className="ascribe-settings-property-collapsible-toggle"
                                    style={{paddingBottom: 0}}>
                                    <InputCheckbox>
                                        <span>
                                            {' ' + getLangText('I agree to the Terms of Service the art price') + ' '}
                                            (<a href="https://s3-us-west-2.amazonaws.com/ascribe0/whitelabel/cyland/terms_and_contract.pdf" target="_blank" style={{fontSize: '0.9em', color: 'rgba(0,0,0,0.7)'}}>
                                                {getLangText('read')}
                                            </a>)
                                        </span>
                                    </InputCheckbox>
                                </Property>
                            </RegisterPieceForm>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className="no-margin">
                        <Col xs={12} sm={10} md={8} smOffset={1} mdOffset={2}>
                            <CylandAdditionalDataForm
                                handleSuccess={this.handleAdditionalDataSuccess}
                                piece={this.state.piece}/>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Row className="no-margin">
                        <Col xs={12} sm={10} md={8} smOffset={1} mdOffset={2}>
                            <LoanForm
                                fullform={true}
                                message={getAclFormMessage('acl_loan', '\"' + this.state.piece.title + '\"', this.state.currentUser.username)}
                                id={{piece_id: this.state.piece.id}}
                                url={ApiUrls.ownership_loans_pieces}
                                email="videoarchive@cyland.org"
                                gallery="Cyland Archive"
                                startdate={today}
                                enddate={datetimeWhenWeAllWillBeFlyingCoolHoverboardsAndDinosaursWillLiveAgain}/>
                        </Col>
                    </Row>
                </div>
            </SlidesContainer>
        );
    }
});

export default CylandRegisterPiece;
