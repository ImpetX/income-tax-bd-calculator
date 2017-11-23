import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default class Portal extends Component {
    static propTypes = {
        children: PropTypes.element
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

    render() {
        return (
            ReactDOM.createPortal(
                this.props.children,
                this.el
            )
        );
    }
}