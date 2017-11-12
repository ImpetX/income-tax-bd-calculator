import React, {Component} from 'react';

import {
    getYearlyGross,
    getLowerValue,
    getInvestmentAllowance,
    getTaxRebate,
    getTaxLiability} from '../utils/utils';

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

    getTaxableHouseRent(houseRent, basicSalary) {
        const THRESHOLD_HOUSE_RENT = 25000;
        let halfOfBasicSalary = basicSalary/2;
        let deductibleAmount = getLowerValue(THRESHOLD_HOUSE_RENT, halfOfBasicSalary);

        return houseRent > deductibleAmount ? houseRent - deductibleAmount : 0;
    }

    getTaxableMedicalAllowance(medicalAllowance, basicSalary) {
        const THRESHOLD_MEDICAL_ALLOWANCE = 120000;
        let tenthOfBasicSalary = getYearlyGross(basicSalary * 0.1);

        let deductibleAmount = getLowerValue(THRESHOLD_MEDICAL_ALLOWANCE, tenthOfBasicSalary);

        return getYearlyGross(medicalAllowance) > deductibleAmount ? getYearlyGross(medicalAllowance) - deductibleAmount : 0;
    }

    getTaxableConveyanceAllowance(conveyanceAllowance) {
        const THRESHOLD_CONVEYANCE_ALLOWANCE = 30000;

        return getYearlyGross(conveyanceAllowance) > THRESHOLD_CONVEYANCE_ALLOWANCE ? getYearlyGross(conveyanceAllowance) - THRESHOLD_CONVEYANCE_ALLOWANCE : 0;
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
            conveyanceAllowance: Number(this.ConveyanceAllowance.value),
            totalInvestment: Number(this.TotalInvestment.value)
        };

        let taxableBasicSalary = getYearlyGross(inputValues.basicSalary);
        let taxableTotalBonus = inputValues.totalBonus;
        let taxableHouseRent = getYearlyGross(this.getTaxableHouseRent(inputValues.houseRent, inputValues.basicSalary));
        let taxableMedicalAllowance = this.getTaxableMedicalAllowance(inputValues.medicalAllowance, inputValues.basicSalary);
        let taxableConveyanceAllowance = this.getTaxableConveyanceAllowance(inputValues.conveyanceAllowance);

        let totalTaxableIncome = taxableBasicSalary + taxableTotalBonus + taxableHouseRent + taxableMedicalAllowance + taxableConveyanceAllowance;

        let taxLiability  = getTaxLiability(totalTaxableIncome);
        let maxInvestmentAllowance = getInvestmentAllowance(totalTaxableIncome);
        let taxRebate = getTaxRebate(maxInvestmentAllowance, inputValues.totalInvestment);
        let totalTax = taxLiability - taxRebate;

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
                        <label>মূল বেতন (মাসিক) / Basic Salary (Monthly)</label>
                        <input
                            type="text"
                            ref={input => this.BasicSalary = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>বাড়ি ভাড়া (মাসিক) / House Rent (Monthly)</label>
                        <input
                            type="text"
                            ref={input => this.HouseRent = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>চিকিৎসা ভাতা (মাসিক) / Medical Allowance (Monthly)</label>
                        <input
                            type="text"
                            ref={input => this.MedicalAllowance = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>পরিবহন ভাতা (মাসিক) / Medical Allowance (Monthly)</label>
                        <input
                            type="text"
                            ref={input => this.ConveyanceAllowance = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>মোট বোনাস (বাৎসরিক) / Total Yearly Bonus (Yearly)</label>
                        <input
                            type="text"
                            ref={input => this.TotalBonus = input}
                            onChange={this.handleChange}/>
                    </div>

                    <div className='mb--15'>
                        <label>মোট বিনিয়োগ (বাৎসরিক) / Total Investement (Yearly)</label>
                        <input
                            type="text"
                            ref={input => this.TotalInvestment = input}
                            onChange={this.handleChange}/>
                    </div>

                    <button type='submit'>মোট কর দেখুন / View Total Tax</button>
                </form>

                {this.state.showTotalTax &&
                    <div>
                        <p>মোট কর: {this.state.totalTax}</p>
                    </div>
                }
            </div>
        );
    }
}

export default TaxCalculator;