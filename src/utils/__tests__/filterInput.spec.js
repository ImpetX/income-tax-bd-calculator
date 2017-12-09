import filterInput from '../filterInput';

describe('filterInput', () => {
    it('Should output "250000" when input is "250,000"', () => {
        expect(filterInput('250,000')).toBe('250000');
    });

    it('Should output "250000" when input is "2,50,000"', () => {
        expect(filterInput('2,50,000')).toBe('250000');
    });

    it('Should output "" when input is ""', () => {
        expect(filterInput('')).toBe('');
    });
});