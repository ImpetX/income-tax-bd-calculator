import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import Modal from './components/lib/Modal/Modal';
import ModalContent from './components/lib/Modal/ModalContent';

export default class ModalPortal extends Component {
    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        totalTax: PropTypes.number,
        onClick: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.selector = document.getElementById('modal');
        this.el = document.createElement('div');
    }

    componentDidMount() {
        this.selector.appendChild(this.el);
    }

    componentWillUnmount() {
        this.selector.removeChild(this.el);
    }

    renderModal() {
        return (
            <Modal
                visible={this.props.visible}
                onClose={this.props.onClose}>
                <ModalContent
                    totalTax={this.props.totalTax}
                    onClick={this.props.onClick}/>
            </Modal>
        );
    }

    render() {
        let children = this.renderModal();
        return (
            ReactDOM.createPortal(
                children,
                this.el
            )
        );
    }
}