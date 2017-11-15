import getLowerValue from './getLowerValue';
import getYearlyGross from './getYearlyGross';

function getTaxableMedicalAllowance(medicalAllowance, basicSalary) {
    const THRESHOLD_MEDICAL_ALLOWANCE = 120000;
    let tenthOfBasicSalary = getYearlyGross(basicSalary * 0.1);

    let deductibleAmount = getLowerValue(THRESHOLD_MEDICAL_ALLOWANCE, tenthOfBasicSalary);

    return getYearlyGross(medicalAllowance) > deductibleAmount ? getYearlyGross(medicalAllowance) - deductibleAmount : 0;
}

export default getTaxableMedicalAllowance;