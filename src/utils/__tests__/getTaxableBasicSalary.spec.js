import {get} from 'object-path';

import getTaxableBasicSalary from '../getTaxableBasicSalary';
import TestData from '../../data/Test';

describe('Get Taxable Basic Salary', () => {

    get(TestData, 'taxable.basic').forEach(el => {
        it(`Should return ${el.amount} when arguments are (${get(TestData, 'salary.basic')}, ${el.months})`, () => {
            expect(getTaxableBasicSalary(get(TestData, 'salary.basic'), el.months)).toBe(el.amount);
        });
    });
});