import getLowerValue from './getLowerValue';
import multiplyByMonths from './multiplyByMonths';

function getTaxableHouseRent(houseRent, thresholdHouseRent, basicSalary, percentage, months) {
    let gross = {
        houseRent: multiplyByMonths(houseRent, months),
        thresholdHouseRent: thresholdHouseRent * 12,
        basicSalary: (basicSalary * percentage) * 12
    };

    let deductibleAmount = getLowerValue(gross.thresholdHouseRent, gross.basicSalary);

    return gross.houseRent > deductibleAmount ? gross.houseRent - deductibleAmount : 0;
}

export default getTaxableHouseRent;