import {get} from 'object-path';

import getInvestmentAllowance from '../getInvestementAllowance';
import TaxData from '../../config/Tax';
import TestData from '../../data/Test';

describe('Get Investment Allowance', () => {
    let taxableIncome = get(TestData, 'taxable.total');
    let investmentAllowance = get(TaxData, 'Investment.Allowance');
    let output = get(TestData, 'investment.allowance');

    it(`Should return ${output} when arguments are (${taxableIncome}, ${investmentAllowance})`, () => {
        expect(getInvestmentAllowance(taxableIncome, investmentAllowance)).toBe(output);
    });
});