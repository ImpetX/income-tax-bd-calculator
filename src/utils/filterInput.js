function filterInput(value) {
    return value.split(/\W|[a-z]/gi).reduce((a, b) => a.concat(b));
}

export default filterInput;