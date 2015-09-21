'use strict';

import React from 'react';

import TextareaAutosize from 'react-textarea-autosize';


let InputTextAreaToggable = React.createClass({
    propTypes: {
        disabled: React.PropTypes.bool,
        rows: React.PropTypes.number.isRequired,
        required: React.PropTypes.string,
        defaultValue: React.PropTypes.string
    },

    getInitialState() {
        return {
            value: null
        };
    },

    componentDidUpdate(prevProps, prevState) {
        // if the components state value was changed during an update, we want to refresh it
        // in this component as well as in the parent Property
        if(!this.state.value && this.state.value !== prevState.value) {
            this.handleChange({
                target: {
                    value: this.state.value
                }
            });
        }

        // Otherwise, if state wasn't defined beforehand and defaultValue is defined from the outside
        // we set it as the component's state and update Property by calling handleChange
        if(!this.state.value && this.props.defaultValue) {
            this.setState({
                value: this.props.defaultValue
            });
        }
    },

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.onChange(event);
    },

    render() {
        let className = 'form-control ascribe-textarea';
        let textarea = null;

        if(!this.props.disabled) {
            className = className + ' ascribe-textarea-editable';
            textarea = (
                <TextareaAutosize
                    className={className}
                    value={this.state.value}
                    rows={this.props.rows}
                    maxRows={10}
                    required={this.props.required}
                    onChange={this.handleChange}
                    onBlur={this.props.onBlur}
                    placeholder={this.props.placeholder} />
            );
        } else {
            textarea = <pre className="ascribe-pre">{this.state.value}</pre>;
        }

        return textarea;
    }
});


export default InputTextAreaToggable;