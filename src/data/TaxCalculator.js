let inputBlockValues = [
    {
        label: 'মূল বেতন (মাসিক) / Basic Salary (Monthly)',
        id: 'BasicSalary',
        onChange: this.handleChange
    },
    {
        label: 'বাড়ি ভাড়া (মাসিক) / House Rent (Monthly)',
        id: 'HouseRent',
        onChange: this.handleChange
    },
    {
        label: 'চিকিৎসা ভাতা (মাসিক) / Medical Allowance (Monthly)',
        id: 'MedicalAllowance',
        onChange: this.handleChange
    },
    {
        label: 'পরিবহন ভাতা (মাসিক) / Conveyance Allowance (Monthly)',
        id: 'ConveyanceAllowance',
        onChange: this.handleChange
    },
    {
        label: 'মোট বোনাস (বাৎসরিক) / Total Yearly Bonus (Yearly)',
        id: 'TotalBonus',
        onChange: this.handleChange
    },
    {
        label: 'মোট বিনিয়োগ (বাৎসরিক) / Total Investement (Yearly)',
        id: 'TotalInvestment',
        onChange: this.handleChange
    }
];

export default inputBlockValues;