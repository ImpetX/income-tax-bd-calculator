import React from 'react';
import PropTypes from 'prop-types';
import Rodal from 'rodal';

import ModalContent from './ModalContent';

const Modal = (props) => (
    <Rodal
        visible={props.visible}
        onClose={props.onClose}>
        <ModalContent
            totalTax={props.totalTax}
            onClick={props.onClick}/>
    </Rodal>
);

Modal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    totalTax: PropTypes.number,
    onClick: PropTypes.func
};

export default Modal;