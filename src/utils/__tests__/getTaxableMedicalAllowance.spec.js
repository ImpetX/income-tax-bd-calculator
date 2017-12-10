import {get} from 'object-path';

import getTaxableMedicalAllowance from '../getTaxableMedicalAllowance';
import TaxData from '../../config/Tax';
import TestData from '../../data/Test';

describe('Get Taxable Medical Allowance', () => {
    let threshold = get(TaxData, 'MedicalAllowance.Threshold');
    let percentage = get(TaxData, 'MedicalAllowance.Percentage');
    let basicSalary = get(TestData, 'salary.basic');

    get(TestData, 'taxable.medicalAllowance.standard').forEach(el => {
        let amount = el.amount;
        let medicalAllowance = get(TestData, 'salary.medicalAllowance.standard');
        let months = el.months;

        it(`Should return ${amount} for arguments (${medicalAllowance}, ${threshold}, ${basicSalary}, ${percentage}, ${months})`, () => {
            expect(getTaxableMedicalAllowance(medicalAllowance, threshold, basicSalary, percentage, months)).toBe(amount);
        });
    });

    get(TestData, 'taxable.medicalAllowance.custom').forEach(el => {
        let amount = el.amount;
        let medicalAllowance = get(TestData, 'salary.medicalAllowance.custom');
        let months = el.months;

        it(`Should return ${amount} for arguments (${medicalAllowance}, ${threshold}, ${basicSalary}, ${percentage}, ${months})`, () => {
            expect(getTaxableMedicalAllowance(medicalAllowance, threshold, basicSalary, percentage, months)).toBe(amount);
        });
    });
});