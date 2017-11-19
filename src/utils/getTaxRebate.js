function getTaxRebate(maxInvestmentAllowance, investedAmount, taxOnInvestment) {
    let allowableInvestment = investedAmount > maxInvestmentAllowance ? maxInvestmentAllowance : investedAmount;

    return allowableInvestment * taxOnInvestment;
}

export default getTaxRebate;