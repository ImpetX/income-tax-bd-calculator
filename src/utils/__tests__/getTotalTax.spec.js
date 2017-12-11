import {get} from 'object-path';

import getTotalTax from '../getTotalTax';
import TestData from '../../data/Test';

describe('Get Total Tax', () => {
    let standardVal = get(TestData, 'taxBeforeMinTax.standard');
    let customVal = get(TestData, 'taxBeforeMinTax.custom');
    const MIN_TAX = 5000;

    it(`Should return ${standardVal} when arguments are (${standardVal}, ${MIN_TAX})`, () => {
        expect(getTotalTax(standardVal, MIN_TAX)).toBe(standardVal);
    });

    it(`Should return ${MIN_TAX} when arguments are (${customVal}, ${MIN_TAX})`, () => {
        expect(getTotalTax(customVal, MIN_TAX)).toBe(MIN_TAX);
    });
});