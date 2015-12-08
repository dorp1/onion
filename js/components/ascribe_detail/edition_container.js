'use strict';

import React from 'react';
import { History } from 'react-router';

import ReactError from '../../mixins/react_error';
import { ResourceNotFoundError } from '../../models/errors';

import EditionActions from '../../actions/edition_actions';
import EditionStore from '../../stores/edition_store';

import UserActions from '../../actions/user_actions';
import UserStore from '../../stores/user_store';

import Edition from './edition';

import AscribeSpinner from '../ascribe_spinner';

import { getLangText } from '../../utils/lang_utils';
import { setDocumentTitle } from '../../utils/dom_utils';
import { mergeOptions } from '../../utils/general_utils';


/**
 * This is the component that implements resource/data specific functionality
 */
let EditionContainer = React.createClass({
    propTypes: {
        actionPanelButtonListType: React.PropTypes.func,
        furtherDetailsType: React.PropTypes.func,
        params: React.PropTypes.object
    },

    mixins: [History, ReactError],

    getInitialState() {
        return mergeOptions(
            EditionStore.getState(),
            UserStore.getState()
        );
    },

    componentDidMount() {
        EditionStore.listen(this.onChange);
        UserStore.listen(this.onChange);

        // Every time we're entering the edition detail page,
        // just reset the edition that is saved in the edition store
        // as it will otherwise display wrong/old data once the user loads
        // the edition detail a second time
        EditionActions.fetchEdition(this.props.params.editionId);

        UserActions.fetchCurrentUser();
    },

    // This is done to update the container when the user clicks on the prev or next
    // button to update the URL parameter (and therefore to switch pieces)
    componentWillReceiveProps(nextProps) {
        if(this.props.params.editionId !== nextProps.params.editionId) {
            EditionActions.fetchEdition(this.props.params.editionId);
        }
    },

    componentDidUpdate() {
        const { editionMeta } = this.state;

        if(editionMeta.err && editionMeta.err.status === 404) {
            this.throws(new ResourceNotFoundError(getLangText("Oops, the edition you're looking for doesn't exist.")));
        }
    },

    componentWillUnmount() {
        window.clearInterval(this.state.timerId);
        EditionStore.unlisten(this.onChange);
    },

    onChange(state) {
        this.setState(state);

        if(state && state.edition && state.edition.digital_work) {
            let isEncoding = state.edition.digital_work.isEncoding;
            if (state.edition.digital_work.mime === 'video' && typeof isEncoding === 'number' && isEncoding !== 100 && !this.state.timerId) {
                let timerId = window.setInterval(() => EditionActions.fetchOne(this.props.params.editionId), 10000);
                this.setState({timerId: timerId});
            }
        }
    },

    render() {
        if (this.state.edition && this.state.edition.id &&
            this.state.currentUser && this.state.currentUser.email) {
            setDocumentTitle([this.state.edition.artist_name, this.state.edition.title].join(', '));
            return (
                <Edition
                    actionPanelButtonListType={this.props.actionPanelButtonListType}
                    furtherDetailsType={this.props.furtherDetailsType}
                    edition={this.state.edition}
                    currentUser={this.state.currentUser}
                    loadEdition={() => EditionActions.fetchEdition(this.props.params.editionId)} />
            );
        } else {
            return (
                <div className="fullpage-spinner">
                    <AscribeSpinner color='dark-blue' size='lg'/>
                </div>
            );
        }
    }
});

export default EditionContainer;
