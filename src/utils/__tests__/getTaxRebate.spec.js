import {get} from 'object-path';

import getTaxRebate from '../getTaxRebate';
import TaxData from '../../config/Tax';
import TestData from '../../data/Test';

describe('Get Tax Rebate', () => {
    let allowance = get(TestData, 'investment.allowance');
    let investedStandard = get(TestData, 'investment.made.standard');
    let investedCustom = get(TestData, 'investment.made.custom');
    const taxRate = get(TaxData, 'Investment.TaxRate');
    let rebateStandard = get(TestData, 'taxRebate.standard');
    let rebateCustom = get(TestData, 'taxRebate.custom');

    it(`Should return ${rebateStandard} when arguments are (${allowance}, ${investedStandard}, ${taxRate})`, () => {
        expect(getTaxRebate(allowance, investedStandard, taxRate)).toBe(rebateStandard);
    });

    it(`Should return ${rebateCustom} when arguments are (${allowance}, ${investedCustom}, ${taxRate})`, () => {
        expect(getTaxRebate(allowance, investedCustom, taxRate)).toBe(rebateCustom);
    });
});