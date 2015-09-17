/**
 *
 */

'use strict';

import React from 'react';
import _Button from 'react-bootstrap/lib/Button';
import classnames from 'classnames';


const DISABLED_STATUSES = ['loading', 'disabled'];


function ButtonFactory(style, btnClassName, options) {

    style = style || 'default';
    options = options || {};

    let GenericButton = React.createClass({
        propTypes: {
            onClick: React.PropTypes.func,
            status: React.PropTypes.oneOf(['loading', 'disabled', null]),
            children: React.PropTypes.oneOfType([React.PropTypes.arrayOf(React.PropTypes.element),
                                                 React.PropTypes.element])
        },

        render: function render() {
            let disabled = DISABLED_STATUSES.indexOf(this.props.status) !== -1;
            let className = '';

            if (this.props.status !== 'disabled' && this.props.status !== null) {
                className = this.props.status;
            }

            return (
                <_Button bsStyle={style} onClick={this.props.onClick} className={classnames(btnClassName, className)} type={options.type} disabled={disabled}>
                    {this.props.children}
                </_Button>
            );
        }

    });

    return GenericButton;
}


export let Button = ButtonFactory('primary', 'btn-primary');
export let SubmitButton = ButtonFactory('primary', 'btn-primary', { type: 'submit' });
export let SubmitDangerButton = ButtonFactory('danger', 'btn-danger', { type: 'submit' });
export let SecondaryButton = ButtonFactory('default', 'btn-secondary');
export let DangerButton = ButtonFactory('danger', 'btn-danger');
