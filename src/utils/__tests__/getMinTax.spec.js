import {get} from 'object-path';

import getMinTax from '../getMinTax';
import TestData from '../../data/Test';

describe('Get Minumum Tax', () => {
    get(TestData, 'minTax').forEach(el => {
        it(`Should return ${el.tax} when arguments are (${el.isInCityCorporation}, ${el.location})`, () => {
            expect(getMinTax(el.isInCityCorporation, el.location)).toBe(el.tax);
        });
    });
});