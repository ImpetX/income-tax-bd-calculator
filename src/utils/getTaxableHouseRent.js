import getLowerValue from './getLowerValue';

function getTaxableHouseRent(houseRent, basicSalary) {
    const THRESHOLD_HOUSE_RENT = 25000;
    let halfOfBasicSalary = basicSalary/2;
    let deductibleAmount = getLowerValue(THRESHOLD_HOUSE_RENT, halfOfBasicSalary);

    return houseRent > deductibleAmount ? houseRent - deductibleAmount : 0;
}

export default getTaxableHouseRent;