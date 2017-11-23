import React from 'react';
import PropTypes from 'prop-types';
import Rodal from 'rodal';

const Modal = (props) => (
    <Rodal
        visible={props.visible}
        onClose={props.onClose}>
        {props.children}
    </Rodal>
);

Modal.propTypes = {
    visible: PropTypes.bool,
    onClose: PropTypes.func,
    children: PropTypes.element
};

export default Modal;