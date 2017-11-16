import React, {Component} from 'react';

import {
    getYearlyGross,
    getLowerValue,
    getInvestmentAllowance,
    getTaxRebate,
    getTaxLiability,
    getTaxableHouseRent,
    getTaxableMedicalAllowance,
    getTaxableConveyanceAllowance,
    getSumOfObjectValues} from '../utils/utils';

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

        let taxable = {
            basicSalary: getYearlyGross(inputValues.basicSalary),
            totalBonus: inputValues.totalBonus,
            houseRent: getYearlyGross(getTaxableHouseRent(inputValues.houseRent, inputValues.basicSalary)),
            medicalAllowance: getTaxableMedicalAllowance(inputValues.medicalAllowance, inputValues.basicSalary),
            conveyanceAllowance: getTaxableConveyanceAllowance(inputValues.conveyanceAllowance)
        };

        let totalTaxableIncome = getSumOfObjectValues(taxable);

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