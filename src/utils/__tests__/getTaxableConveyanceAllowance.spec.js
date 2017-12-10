import {get} from 'object-path';

import getTaxableConveyanceAllowance from '../getTaxableConveyanceAllowance';
import TaxData from '../../config/Tax';
import TestData from '../../data/Test';

describe('Get Taxable Conveyance Allowance', () => {
    let threshold = get(TaxData, 'ConveyanceAllowance.Threshold');

    get(TestData, 'taxable.conveyanceAllowance.standard').forEach(el => {
        let amount = el.amount;
        let conveyanceAllowance = get(TestData, 'salary.conveyanceAllowance.standard');
        let months = el.months;

        it(`Should return ${amount} for arguments (${conveyanceAllowance}, ${threshold}, ${months})`, () => {
            expect(getTaxableConveyanceAllowance(conveyanceAllowance, threshold, months)).toBe(amount);
        });
    });

    get(TestData, 'taxable.conveyanceAllowance.custom').forEach(el => {
        let amount = el.amount;
        let conveyanceAllowance = get(TestData, 'salary.conveyanceAllowance.custom');
        let months = el.months;

        it(`Should return ${amount} for arguments (${conveyanceAllowance}, ${threshold}, ${months})`, () => {
            expect(getTaxableConveyanceAllowance(conveyanceAllowance, threshold, months)).toBe(amount);
        });
    });
});