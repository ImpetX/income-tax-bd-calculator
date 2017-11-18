import React from 'react';
import PropTypes from 'prop-types';

const Label = ({label}) => (
    <label className='label'>{label}</label>
);

Label.propTypes = {
    label: PropTypes.string
};

Label.defaultProps = {
    label: ''
};

export default Label;