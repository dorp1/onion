'use strict';

import React from 'react';
import ProgressBar from 'react-bootstrap/lib/ProgressBar';

import AclProxy from '../../acl_proxy';
import AscribeSpinner from '../../ascribe_spinner';
import { getLangText } from '../../../utils/lang_utils';


const { number, string, func, bool } = React.PropTypes;

const FileDragAndDropPreviewImage = React.createClass({
    propTypes: {
        progress: number,
        url: string,
        toggleUploadProcess: func,
        downloadUrl: string,
        areAssetsDownloadable: bool,
        showProgress: bool
    },

    getInitialState() {
        return {
            paused: true
        };
    },

    toggleUploadProcess(e) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            paused: !this.state.paused
        });

        this.props.toggleUploadProcess();
    },

    render() {
        const { url,
                progress,
                areAssetsDownloadable,
                downloadUrl,
                showProgress } = this.props;
        const imageStyle = {
            backgroundImage: 'url("' + url + '")',
            backgroundSize: 'cover'
        };

        let actionSymbol;

        // only if assets are actually downloadable, there should be a download icon if the process is already at
        // 100%. If not, no actionSymbol should be displayed
        if(progress === 100 && areAssetsDownloadable) {
            actionSymbol = <a href={downloadUrl} target="_blank" className="glyphicon glyphicon-download action-file" aria-hidden="true" title={getLangText('Download file')}/>;
        } else if(progress >= 0 && progress < 100) {
            actionSymbol = (
                <div className="spinner-file">
                    <AscribeSpinner color='dark-blue' size='md' />
                </div>
            );
        } else {
            actionSymbol = (
                <span className='ascribe-icon icon-ascribe-ok action-file'/>
            );
        }

        return (
            <div
                className="file-drag-and-drop-preview-image hidden-print"
                style={imageStyle}>
                    <AclProxy
                        show={showProgress}>
                        <ProgressBar
                            now={Math.ceil(progress)}
                            className="ascribe-progress-bar ascribe-progress-bar-xs"/>
                    </AclProxy>
                    {actionSymbol}
            </div>
        );
    }
});

export default FileDragAndDropPreviewImage;
