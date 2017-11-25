import isInvalidInput from './isInvalidInput';

function multiplyByMonths(value, months) {
    return isInvalidInput(months) ? value * 12 : value * months;
}

export default multiplyByMonths;