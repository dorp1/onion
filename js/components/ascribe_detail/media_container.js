'use strict';

import React from 'react';

import Button from 'react-bootstrap/lib/Button';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';

import MediaPlayer from './../ascribe_media/media_player';

import CollapsibleButton from './../ascribe_collapsible/collapsible_button';


let MediaContainer = React.createClass({
    propTypes: {
        content: React.PropTypes.object
    },

    render() {
        let thumbnail = this.props.content.thumbnail;
        let mimetype = this.props.content.digital_work.mime;
        let embed = null;
        let extraData = null;

        if (this.props.content.digital_work.encoding_urls) {
            extraData = this.props.content.digital_work.encoding_urls.map(e => { return { url: e.url, type: e.label }; });
        }

        if (['video', 'audio'].indexOf(mimetype) > -1){
            embed = (
                <CollapsibleButton
                    button={
                        <Button bsSize="xsmall" className="ascribe-margin-1px">
                            Embed
                        </Button>
                    }
                    panel={
                        <pre className="">
                            {'<iframe width="560" height="315" src="http://embed.ascribe.io/content/'
                                + this.props.content.bitcoin_id + '" frameborder="0" allowfullscreen></iframe>'
                            }
                        </pre>
                    }/>
            );
        }
        return (
            <div>
                <MediaPlayer mimetype={mimetype}
                                        preview={thumbnail}
                                        url={this.props.content.digital_work.url}
                                        extraData={extraData} />
                <p className="text-center">
                    <Button bsSize="xsmall" className="ascribe-margin-1px" href={this.props.content.digital_work.url} target="_blank">
                        Download <Glyphicon glyph="cloud-download"/>
                    </Button>
                    {embed}
                </p>
            </div>
        );
    }
});

export default MediaContainer;