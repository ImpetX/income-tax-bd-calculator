import React, {Component} from 'react';

import inputBlockValues from '../data/TaxCalculator';
import {
    getYearlyGross,
    getLowerValue,
    getInvestmentAllowance,
    getTaxRebate,
    getTaxLiability,
    getTaxableHouseRent,
    getTaxableMedicalAllowance,
    getTaxableConveyanceAllowance,
    getSumOfObjectValues,
    getInputValue,
    getMinTax,
    getTotalTax} from '../utils/utils';
import InputBlock from '../components/lib/InputBlock';
import Button from '../components/lib/Button';

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
            basicSalary: getInputValue('BasicSalary'),
            houseRent: getInputValue('HouseRent'),
            medicalAllowance: getInputValue('MedicalAllowance'),
            conveyanceAllowance: getInputValue('ConveyanceAllowance'),
            totalBonus: getInputValue('TotalBonus'),
            totalInvestment: getInputValue('TotalInvestment')
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
        let minTax = getMinTax(true, 'Dhaka');
        let totalTax = getTotalTax((taxLiability - taxRebate), minTax);

        this.setState({
            totalTax,
            showTotalTax: true
        });
    }

    render() {
        return (
            <div className='wrapper'>
                <form onSubmit={this.handleSubmit}>
                    {inputBlockValues.map(el => (
                        <InputBlock
                            key={el.id}
                            label={el.label}
                            id={el.id}
                            onChange={el.onChange}/>
                    ))}

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