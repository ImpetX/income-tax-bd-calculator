import React from 'react';
import PropTypes from 'prop-types';

const Select = ({onChange, options}) => (
    <select onChange={onChange}>
        {options.map((el, i) => {
            let defaultValue = i === 0 ? true : false;
            return <option defaultValue={defaultValue} value={el.value} key={el.label}>{el.label}</option>;
        })}
    </select>
);

Select.propTypes = {
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string
    }))
};

export default Select;