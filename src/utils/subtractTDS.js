import multiplyByMonths from './multiplyByMonths';

function subtractTds(tds, totalTaxWithoutTDS, months) {
    let totalTax =  totalTaxWithoutTDS - multiplyByMonths(tds, months);

    return totalTax <= 0 ? 0 : totalTax;
}

export default subtractTds;