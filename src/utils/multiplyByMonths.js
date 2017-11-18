import isUnvalidInput from './isUnvalidInput';

function multiplyByMonths(value, months) {
    return isUnvalidInput(months) ? value * 12 : value * months;
}

export default multiplyByMonths;