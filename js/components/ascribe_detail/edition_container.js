'use strict';

import React from 'react';

import EditionActions from '../../actions/edition_actions';
import EditionStore from '../../stores/edition_store';

import Edition from './edition';

import AppConstants from '../../constants/application_constants';



/**
 * This is the component that implements resource/data specific functionality
 */
let EditionContainer = React.createClass({
    getInitialState() {
        return EditionStore.getState();
    },

    onChange(state) {
        this.setState(state);
        if (!state.edition.digital_work) {
            return;
        }
        let isEncoding = state.edition.digital_work.isEncoding;
        if (state.edition.digital_work.mime === 'video' && typeof isEncoding === 'number' && isEncoding !== 100 && !this.state.timerId) {
            let timerId = window.setInterval(() => EditionActions.fetchOne(this.props.params.editionId), 10000);
            this.setState({timerId: timerId});
        }
    },

    componentDidMount() {
        EditionStore.listen(this.onChange);
        EditionActions.fetchOne(this.props.params.editionId);
    },

    // This is done to update the container when the user clicks on the prev or next
    // button to update the URL parameter (and therefore to switch pieces)
    componentWillReceiveProps(nextProps) {
        if(this.props.params.editionId !== nextProps.params.editionId) {
            EditionActions.updateEdition({});
            EditionActions.fetchOne(nextProps.params.editionId);
        }
    },

    componentWillUnmount() {
        // Every time we're leaving the edition detail page,
        // just reset the edition that is saved in the edition store
        // as it will otherwise display wrong/old data once the user loads
        // the edition detail a second time
        EditionActions.updateEdition({});
        window.clearInterval(this.state.timerId);
        EditionStore.unlisten(this.onChange);
    },


    loadEdition() {
        EditionActions.fetchOne(this.props.params.editionId);
    },

    render() {
        console.log(this.state);
        if('title' in this.state.edition) {
            return (
                <Edition
                    edition={this.state.edition}
                    loadEdition={this.loadEdition}/>
            );
        } else {
            return (
                <div className="fullpage-spinner">
                    <img src={AppConstants.baseUrl + 'static/img/ascribe_animated_medium.gif'} />
                </div>
            );
        }
    }
});

export default EditionContainer;
