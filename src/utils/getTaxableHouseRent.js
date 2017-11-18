import getLowerValue from './getLowerValue';
import  multiplyByMonths from './multiplyByMonths';

function getTaxableHouseRent(houseRent, thresholdHouseRent, basicSalary, months) {
    let gross = {
        houseRent: multiplyByMonths(houseRent, months),
        thresholdHouseRent: multiplyByMonths(thresholdHouseRent, months),
        basicSalary: multiplyByMonths(basicSalary, months)
    };

    let deductibleAmount = getLowerValue(gross.thresholdHouseRent, (gross.basicSalary)/2);

    return gross.houseRent > deductibleAmount ? gross.houseRent - deductibleAmount : 0;
}

export default getTaxableHouseRent;