import getLowerValue from './getLowerValue';
import multiplyByMonths from './multiplyByMonths';

function getTaxableMedicalAllowance(medicalAllowance, thresholdMedicalAllowance, basicSalary, percentage, months) {
    let gross = {
        medicalAllowance: multiplyByMonths(medicalAllowance, months),
        tenthOfBasicSalary: (basicSalary * percentage) * 12
    };

    let deductibleAmount = getLowerValue(thresholdMedicalAllowance, gross.tenthOfBasicSalary);

    return gross.medicalAllowance > deductibleAmount ? gross.medicalAllowance - deductibleAmount : 0;
}

export default getTaxableMedicalAllowance;