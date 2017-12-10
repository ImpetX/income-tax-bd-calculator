import {get} from 'object-path';

import getTaxableHouseRent from '../getTaxableHouseRent';
import TaxData from '../../config/Tax';
import TestData from '../../data/Test';

describe('Get Taxable House Rent', () => {
    let threshold = get(TaxData, 'HouseRent.Threshold');
    let percentage = get(TaxData, 'HouseRent.Percentage');
    let basicSalary = get(TestData, 'salary.basic');

    get(TestData, 'taxable.houseRent.standard').forEach(el => {
        let amount = el.amount;
        let houseRent = get(TestData, 'salary.houseRent.standard');
        let months = el.months;

        it(`Should return ${amount} for arguments (${houseRent}, ${threshold}, ${basicSalary}, ${percentage}, ${months})`, () => {
            expect(getTaxableHouseRent(houseRent, threshold, basicSalary, percentage, months)).toBe(amount);
        });
    });

    get(TestData, 'taxable.houseRent.custom').forEach(el => {
        let amount = el.amount;
        let houseRent = get(TestData, 'salary.houseRent.custom');
        let months = el.months;

        it(`Should return ${amount} for arguments (${houseRent}, ${threshold}, ${basicSalary}, ${percentage}, ${months})`, () => {
            expect(getTaxableHouseRent(houseRent, threshold, basicSalary, percentage, months)).toBe(amount);
        });
    });
});