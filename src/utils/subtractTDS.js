import multiplyByMonths from './multiplyByMonths';
import isInvalidInput from './isInvalidInput';

function subtractTds(tds, totalTaxWithoutTDS, months) {
    let tdsInput = isInvalidInput(tds) ? 0 : tds;
    let totalTax =  totalTaxWithoutTDS - multiplyByMonths(tdsInput, months);

    return totalTax <= 0 ? 0 : totalTax;
}

export default subtractTds;