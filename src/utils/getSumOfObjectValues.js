function getSumOfObjectValues(obj) {
    return Object.values(obj).reduce((a, b) => a + b);
}

export default getSumOfObjectValues;