/*
    isInvalidInput('abcd') => true
    isInvalidInput(42) => false
    isInvalidInput('1a2b') => true
*/

function isInvalidInput(input) {
    return Number.isNaN(Number(input));
}

export default isInvalidInput;