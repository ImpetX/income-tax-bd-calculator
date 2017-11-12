function getTaxLiability(taxableIncome) {
    const TAX_FEE_THRESHOLD = {
        GROUP_1: {
            income: 250000,
            tax: 0
        },

        GROUP_2: {
            income: 400000,
            tax: 0.1
        },

        REST: {
            tax: 0.15
        }
    };

    let taxLiability = 0;

    if (taxableIncome >= TAX_FEE_THRESHOLD.GROUP_1.income) {
        taxableIncome = taxableIncome - TAX_FEE_THRESHOLD.GROUP_1.income;

        if(taxableIncome <= 0) {
            return taxLiability;
        }

        else {
            if (taxableIncome <= TAX_FEE_THRESHOLD.GROUP_2.income) {
                taxLiability+= taxableIncome * TAX_FEE_THRESHOLD.GROUP_2.tax;
                taxableIncome = taxableIncome - TAX_FEE_THRESHOLD.GROUP_2.income;

                if(taxableIncome <= 0) {
                    return taxLiability;
                }

                else {
                    taxLiability+= taxableIncome * TAX_FEE_THRESHOLD.REST.tax;
                    return taxLiability;
                }
            }
        }
    }

    return taxLiability;
}

export default getTaxLiability;