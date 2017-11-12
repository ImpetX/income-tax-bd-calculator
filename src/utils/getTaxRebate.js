function getTaxRebate(maxInvestmentAllowance, investedAmount) {
    let allowableInvestment = investedAmount > maxInvestmentAllowance ? maxInvestmentAllowance : investedAmount;

    return allowableInvestment * 0.15;
}

export default getTaxRebate;