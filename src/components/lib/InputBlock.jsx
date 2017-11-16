import React from 'react';
import PropTypes from 'prop-types';

import Input from './Input';
import Label from './Label';

const InputBlock = props => (
    <div className='mb--15'>
        <Label
            label={props.label}/>
        <Input
            id={props.id}
            type={props.type}
            onChange={props.onChange}/>
    </div>
);

InputBlock.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func
};

InputBlock.defaultProps = {
    type: 'text',
    label: ''
};

export default InputBlock;