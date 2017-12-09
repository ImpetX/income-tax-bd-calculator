import multiplyByMonths from '../multiplyByMonths';

describe('Multiply By Months', () => {
    it('Should return 60 when arguments are (5, "abcd")', () => {
        expect(multiplyByMonths(5,'abcd')).toBe(60);
    });

    it('Should return 40 when arguments are (5, 8)', () => {
        expect(multiplyByMonths(5,8)).toBe(40);
    });
});