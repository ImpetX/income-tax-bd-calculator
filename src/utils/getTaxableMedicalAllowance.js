import getLowerValue from './getLowerValue';
import multiplyByMonths from './multiplyByMonths';

function getTaxableMedicalAllowance(medicalAllowance, thresholdMedicalAllowance, basicSalary, months) {
    let gross = {
        medicalAllowance: multiplyByMonths(medicalAllowance, months),
        tenthOfBasicSalary: multiplyByMonths((basicSalary * 0.1), months)
    };

    let deductibleAmount = getLowerValue(thresholdMedicalAllowance, gross.tenthOfBasicSalary);

    return gross.medicalAllowance > deductibleAmount ? gross.medicalAllowance - deductibleAmount : 0;
}

export default getTaxableMedicalAllowance;