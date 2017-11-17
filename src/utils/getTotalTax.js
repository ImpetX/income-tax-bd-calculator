function getTotalTax(tax, minTax) {
    return tax > minTax ? tax : minTax;
}

export default getTotalTax;