import React from 'react';
import PropTypes from 'prop-types';

const Button = props => (
    <button type={props.type}>{props.label}</button>
);

Button.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string
};

Button.defaultProps = {
    type: 'button',
    label: ''
};

export default Button;