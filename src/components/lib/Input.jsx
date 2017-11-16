import React from 'react';
import PropTypes from 'prop-types';

const Input = ({id, type, onChange}) => (
    <input
        id={id}
        type={type}
        onChange={onChange}/>
);

Input.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func
};

Input.defaultProps = {
    type: 'text'
};

export default Input;