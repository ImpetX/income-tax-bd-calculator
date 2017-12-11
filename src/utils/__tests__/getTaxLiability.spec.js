import {get} from 'object-path';

import getTaxLiability from '../getTaxLiability';
import TestData from '../../data/Test';

const TEST_CASES = [
    {
        input: get(TestData, 'taxable.total'),
        output: get(TestData, 'taxLiability')
    },

    {
        input: 440000,
        output: 19000
    },

    {
        input: 240000,
        output: 0
    },

    {
        input: 2500000,
        output: 317500
    }
];

describe('Get Tax Liability', () => {
    TEST_CASES.forEach(el => {
        it(`Should return ${el.output} when argument is ${el.input}`, () => {
            expect(getTaxLiability(el.input)).toBe(el.output);
        });
    });
});