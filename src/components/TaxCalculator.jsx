import React, {Component} from 'react';

class TaxCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalTax: 0,
            showTotalTax: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getLowerValue(value1, value2) {
        return value1 < value2 ? value1 : value2;
    }

    getYearlyGross(value) {
        return value * 12;
    }

    getTaxableHouseRent(houseRent, basicSalary) {
        const THRESHOLD_HOUSE_RENT = 25000;
        let halfOfBasicSalary = basicSalary/2;
        let deductibleAmount = this.getLowerValue(THRESHOLD_HOUSE_RENT, halfOfBasicSalary);

        return houseRent > deductibleAmount ? houseRent - deductibleAmount : 0;
    }

    getTaxableMedicalAllowance(medicalAllowance, basicSalary) {
        const THRESHOLD_MEDICAL_ALLOWANCE = 120000;
        let tenthOfBasicSalary = this.getYearlyGross(basicSalary * 0.1);

        let deductibleAmount = this.getLowerValue(THRESHOLD_MEDICAL_ALLOWANCE, tenthOfBasicSalary);

        return this.getYearlyGross(medicalAllowance) > deductibleAmount ? this.getYearlyGross(medicalAllowance) - deductibleAmount : 0;
    }

    getTaxableConveyanceAllowance(conveyanceAllowance) {
        const THRESHOLD_CONVEYANCE_ALLOWANCE = 30000;

        return this.getYearlyGross(conveyanceAllowance) > THRESHOLD_CONVEYANCE_ALLOWANCE ? this.getYearlyGross(conveyanceAllowance) - THRESHOLD_CONVEYANCE_ALLOWANCE : 0;
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            showTotalTax: false
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let inputValues = {
            basicSalary: Number(this.BasicSalary.value),
            totalBonus: Number(this.TotalBonus.value),
            houseRent: Number(this.HouseRent.value),
            medicalAllowance: Number(this.MedicalAllowance.value),
            conveyanceAllowance: Number(this.ConveyanceAllowance.value)
        };

        let taxOnBasicSalary = this.getYearlyGross(inputValues.basicSalary);
        let taxOnTotalBonus = inputValues.totalBonus;
        let taxOnHouseRent = this.getYearlyGross(this.getTaxableHouseRent(inputValues.houseRent, inputValues.basicSalary));
        let taxableMedicalAllowance = this.getTaxableMedicalAllowance(inputValues.medicalAllowance, inputValues.basicSalary);
        let taxableConveyanceAllowance = this.getTaxableConveyanceAllowance(inputValues.conveyanceAllowance);

        let totalTax = taxOnBasicSalary + taxOnTotalBonus + taxOnHouseRent + taxableMedicalAllowance + taxableConveyanceAllowance;

        this.setState({
            totalTax,
            showTotalTax: true
        });
    }

    render() {
        return (
            <div className='wrapper'>
                <form onSubmit={this.handleSubmit}>
                    <div className='mb--15'>
                        <label>মূল বেতন (মাসিক) / Basic Salary</label>
                        <input
                            type="text"
                            ref={input => this.BasicSalary = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>বাড়ি ভাড়া (মাসিক) / House Rent</label>
                        <input
                            type="text"
                            ref={input => this.HouseRent = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>চিকিৎসা ভাতা (মাসিক) / Medical Allowance</label>
                        <input
                            type="text"
                            ref={input => this.MedicalAllowance = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>পরিবহন ভাতা (মাসিক) / Medical Allowance</label>
                        <input
                            type="text"
                            ref={input => this.ConveyanceAllowance = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>মোট বোনাস (বাৎসরিক) / Total Yearly Bonus</label>
                        <input
                            type="text"
                            ref={input => this.TotalBonus = input}
                            onChange={this.handleChange}/>
                    </div>

                    <button type='submit'>আয়কর গণণা</button>
                </form>

                {this.state.showTotalTax &&
                <p>মোট আয়কর: {this.state.totalTax}</p>
                }
            </div>
        );
    }
}

export default TaxCalculator;