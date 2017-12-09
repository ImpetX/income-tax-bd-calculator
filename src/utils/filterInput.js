/*
    filterInput('250,000') => '250000'
*/

function filterInput(value) {
    return value.split(/\W|[a-z]/gi).reduce((a, b) => a.concat(b));
}

export default filterInput;