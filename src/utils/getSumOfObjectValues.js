/*
    const obj = {
        a: 1,
        b: 5,
        c: 12
    };

    getSumOfObjectValues(obj) => 18

    ** this function is not applicable to nested objects.
*/

function getSumOfObjectValues(obj) {
    return Object.values(obj).reduce((a, b) => a + b);
}

export default getSumOfObjectValues;