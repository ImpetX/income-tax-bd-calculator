import isInvalidInput from '../isInvalidInput';

describe('Is Invalid Input', () => {
    it('Should return true when input is "ABCD"', () => {
        expect(isInvalidInput('ABCD')).toBe(true);
    });

    it('Should return true when input is "1a2b"', () => {
        expect(isInvalidInput('1a2b')).toBe(true);
    });

    it('Should return false when input is "42"', () => {
        expect(isInvalidInput('42')).toBe(false);
    });
});