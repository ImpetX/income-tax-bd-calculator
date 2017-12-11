import subtractTDS from '../subtractTDS';

const TEST_CASES = [
    {
        tds: 'text',
        tax: 46000,
        months: 12,
        output: 46000
    },

    {
        tds: 500,
        tax: 46000,
        months: 12,
        output: 40000
    },

    {
        tds: 5000,
        tax: 46000,
        months: 12,
        output: 0
    },

    {
        tds: 5000,
        tax: 46000,
        months: 6,
        output: 16000
    },
];

describe('Subtract TDS', () => {
    TEST_CASES.forEach(el => {
        it(`Should return ${el.output} when arguments are (${el.tds}, ${el.tax}, ${el.months})`, () => {
            expect(subtractTDS(el.tds, el.tax, el.months)).toBe(el.output);
        });
    });
});