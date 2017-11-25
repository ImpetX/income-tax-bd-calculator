import filterInput from './filterInput';

function getInputValue(id) {
    return Number(filterInput(document.getElementById(id).value));
}

export default getInputValue;