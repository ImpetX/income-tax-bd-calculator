import React from 'react';
import PropTypes from 'prop-types';

const ModalContent = ({totalTax ,onClick}) => (
    <div>
        <p>মোট কর / Total Tax: {totalTax}</p>
        <button onClick={onClick}>ধন্যবাদ / Thank You</button>
    </div>
);

ModalContent.propTypes = {
    totalTax: PropTypes.number,
    onClick: PropTypes.func
};

export default ModalContent;