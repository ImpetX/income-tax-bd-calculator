import React, {Component} from 'react';

import {getYearlyGross, getLowerValue} from '../utils/utils';

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
            conveyanceAllowance: Number(this.ConveyanceAllowance.value)
        };

        let taxableBasicSalary = getYearlyGross(inputValues.basicSalary);
        let taxableTotalBonus = inputValues.totalBonus;
        let taxableHouseRent = getYearlyGross(this.getTaxableHouseRent(inputValues.houseRent, inputValues.basicSalary));
        let taxableMedicalAllowance = this.getTaxableMedicalAllowance(inputValues.medicalAllowance, inputValues.basicSalary);
        let taxableConveyanceAllowance = this.getTaxableConveyanceAllowance(inputValues.conveyanceAllowance);

        let totalTax = taxableBasicSalary + taxableTotalBonus + taxableHouseRent + taxableMedicalAllowance + taxableConveyanceAllowance;

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

                    <button type='submit'>করযোগ্য আয় দেখুন</button>
                </form>

                {this.state.showTotalTax &&
                    <p>মোট করযোগ্য আয়: {this.state.totalTax}</p>
                }
            </div>
        );
    }
}

export default TaxCalculator;