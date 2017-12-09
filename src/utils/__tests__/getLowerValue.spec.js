import getLowerValue from '../getLowerValue';

describe('Get Lower Value', () => {
    it('Should return 5 when arguments are (5, 10)', () => {
        expect(getLowerValue(5, 10)).toBe(5);
    });

    it('Should return 5 when arguments are (10, 5)', () => {
        expect(getLowerValue(10, 5)).toBe(5);
    });
});