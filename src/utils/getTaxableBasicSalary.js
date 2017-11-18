import isUnvalidInput from './isUnvalidInput';

function getTaxableBasicSalary(salary, months) {
    if (isUnvalidInput(months)) {
        return salary * 12;
    } else {
        return salary * months;
    }
}

export default getTaxableBasicSalary;