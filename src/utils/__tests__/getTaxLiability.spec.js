import {get} from 'object-path';

import getTaxLiability from '../getTaxLiability';
import TestData from '../../data/Test';

describe('Get Tax Liability', () => {
    let totalTaxableIncome = get(TestData, 'taxable.total');
    let taxLiability = get(TestData, 'taxLiability');

    it(`Should return ${taxLiability} when argument is ${totalTaxableIncome}`, () => {
        expect(getTaxLiability(totalTaxableIncome)).toBe(taxLiability);
    });

    it(`Should return 19000 when argument is 440000`, () => {
        expect(getTaxLiability(440000)).toBe(19000);
    });

    it(`Should return 0 when argument is 240000`, () => {
        expect(getTaxLiability(240000)).toBe(0);
    });

    it(`Should return 0 when argument is 240000`, () => {
        expect(getTaxLiability(240000)).toBe(0);
    });

    it(`Should return 317500 when argument is 2500000`, () => {
        expect(getTaxLiability(2500000)).toBe(317500);
    });
});