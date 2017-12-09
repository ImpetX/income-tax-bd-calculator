import getSumOfObjectValues from '../getSumOfObjectValues';

const obj = {
    a: 1,
    b: 5,
    c: 12
};

describe('Get Sum of Object Values', () => {
    it('Should return 18', () => {
        expect(getSumOfObjectValues(obj)).toBe(18);
    });
});