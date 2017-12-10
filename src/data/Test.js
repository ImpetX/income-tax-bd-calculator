const TestData = {
    salary: {
        basic: 50000,
        houseRent: 25000,
        medicalAllowance: 5000,
        conveyanceAllowance: 20000
    },

    bonus: 100000,

    taxable: {
        basic: [
            {
                months: 12,
                amount: 600000
            },

            {
                months: 6,
                amount: 300000
            },

            {
                months: 3,
                amount: 150000
            }
        ],
        houseRent: 0,
        medicalAllowance: 0,
        conveyanceAllowance: 210000,
        bonus: 100000,
        total: 910000
    },

    taxaLiability: 79000,

    investment: {
        allowance: 227500,
        made: 220000
    },

    taxRebate: 33000,

    netTax: 46000
};

export default TestData;