/*
    multiplyByMonths(5,'abcd') => 60
    multiplyByMonths(5,8) => 40
*/

import isInvalidInput from './isInvalidInput';

function multiplyByMonths(value, months) {
    return isInvalidInput(months) ? value * 12 : value * months;
}

export default multiplyByMonths;