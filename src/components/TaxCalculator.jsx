import React, {Component} from 'react';

import InputBlock from '../components/lib/InputBlock';
import Button from '../components/lib/Button';

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
            basicSalary: Number(document.getElementById('BasicSalary').value),
            houseRent: Number(document.getElementById('HouseRent').value),
            medicalAllowance: Number(document.getElementById('MedicalAllowance').value),
            conveyanceAllowance: Number(document.getElementById('ConveyanceAllowance').value),
            totalBonus: Number(document.getElementById('TotalBonus').value),
            totalInvestment: Number(document.getElementById('TotalInvestment').value)
        };

        let taxable = {
            basicSalary: getYearlyGross(inputValues.basicSalary),
            houseRent: getYearlyGross(getTaxableHouseRent(inputValues.houseRent, inputValues.basicSalary)),
            medicalAllowance: getTaxableMedicalAllowance(inputValues.medicalAllowance, inputValues.basicSalary),
            conveyanceAllowance: getTaxableConveyanceAllowance(inputValues.conveyanceAllowance),
            totalBonus: inputValues.totalBonus
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
                    <InputBlock
                        label='মূল বেতন (মাসিক) / Basic Salary (Monthly)'
                        id='BasicSalary'
                        onChange={this.handleChange}/>

                    <InputBlock
                        label='বাড়ি ভাড়া (মাসিক) / House Rent (Monthly)'
                        id='HouseRent'
                        onChange={this.handleChange}/>

                    <InputBlock
                        label='চিকিৎসা ভাতা (মাসিক) / Medical Allowance (Monthly)'
                        id='MedicalAllowance'
                        onChange={this.handleChange}/>

                    <InputBlock
                        label='পরিবহন ভাতা (মাসিক) / Conveyance Allowance (Monthly)'
                        id='ConveyanceAllowance'
                        onChange={this.handleChange}/>

                    <InputBlock
                        label='মোট বোনাস (বাৎসরিক) / Total Yearly Bonus (Yearly)'
                        id='TotalBonus'
                        onChange={this.handleChange}/>

                    <InputBlock
                        label='মোট বিনিয়োগ (বাৎসরিক) / Total Investement (Yearly)'
                        id='TotalInvestment'
                        onChange={this.handleChange}/>

                    <Button
                        type='submit'
                        label='মোট কর দেখুন / View Total Tax'/>
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