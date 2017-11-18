import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Select from './Select';
import Label from './Label';

const SelectBlock = props => {
    let classes = classNames({
        'mb--15': true,
        'inlineBlock': props.inlineBlock,
        'vAlign--top': props.vAlignTop
    });

    return (
        <div className={classes}>
            <Label
                label={props.label}/>
            <Select
                onChange={props.onChange}
                options={props.options}/>
        </div>
    );
}

SelectBlock.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    })),
    inlineBlock: PropTypes.bool,
    vAlignTop: PropTypes.bool
};

SelectBlock.defaultProps = {
    type: 'text',
    label: '',
    inlineBlock: false,
    vAlignTop: false
};

export default SelectBlock;