import React, {Component} from 'react';

import Months from '../data/Months';
import inputBlockValues from '../data/TaxCalculator';
import {CityCorporationCheckData,
    CityCorporations} from '../data/LocationSelect';
import {
    getYearlyGross,
    getLowerValue,
    getInvestmentAllowance,
    getTaxRebate,
    getTaxLiability,
    getTaxableBasicSalary,
    getTaxableHouseRent,
    getTaxableMedicalAllowance,
    getTaxableConveyanceAllowance,
    getSumOfObjectValues,
    getInputValue,
    getMinTax,
    getTotalTax} from '../utils/utils';
import InputBlock from '../components/lib/InputBlock';
import SelectBlock from '../components/lib/SelectBlock';
import Button from '../components/lib/Button';

class TaxCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalTax: 0,
            showTotalTax: false,
            enableLocationSelection: false,
            location: null,
            numberOfMonths: 12
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleMonthsChange = this.handleMonthsChange.bind(this);
        this.handleCityCorporationCheckChange = this.handleCityCorporationCheckChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleMonthsChange(e) {
        e.preventDefault();

        this.setState({
            numberOfMonths: e.target.value
        });
    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            showTotalTax: false
        });
    }

    handleCityCorporationCheckChange(e) {
        e.preventDefault();

        if(e.target.value === 'yes') {
            this.setState({
                enableLocationSelection: true
            });
        } else {
            this.setState({
                enableLocationSelection: false
            });
        }
    }

    handleLocationChange(e) {
        e.preventDefault();

        this.setState({
            location: e.target.value
        });
    }

    getTaxAreaParams(hasArea, location) {
        return {hasArea, location};
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
            basicSalary: getTaxableBasicSalary(inputValues.basicSalary, this.state.numberOfMonths),
            houseRent: getYearlyGross(getTaxableHouseRent(inputValues.houseRent, inputValues.basicSalary)),
            medicalAllowance: getTaxableMedicalAllowance(inputValues.medicalAllowance, inputValues.basicSalary),
            conveyanceAllowance: getTaxableConveyanceAllowance(inputValues.conveyanceAllowance),
            totalBonus: inputValues.totalBonus
        };

        let totalTaxableIncome = getSumOfObjectValues(taxable);

        let taxLiability  = getTaxLiability(totalTaxableIncome);
        let maxInvestmentAllowance = getInvestmentAllowance(totalTaxableIncome);
        let taxRebate = getTaxRebate(maxInvestmentAllowance, inputValues.totalInvestment);
        let params = this.getTaxAreaParams(this.state.enableLocationSelection, this.state.location);
        let minTax = getMinTax(params.hasArea, params.location);
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
                    <SelectBlock
                        label='যে কয় মাসের জন্য ট্যাক্স নিরুপণ করতে চান নির্বাচন করুন / Select the number of months you want to calculate for'
                        onChange={this.handleMonthsChange}
                        options={Months}/>

                    {inputBlockValues.map(el => (
                        <InputBlock
                            key={el.id}
                            label={el.label}
                            id={el.id}
                            onChange={el.onChange}/>
                    ))}

                    <SelectBlock
                        label='আপনি কি সিটি কর্পোরেশনের বাসিন্দা? / Do you live in city corporation?'
                        onChange={this.handleCityCorporationCheckChange}
                        options={CityCorporationCheckData}
                        inlineBlock/>

                    {this.state.enableLocationSelection &&
                        <SelectBlock
                            label='স্থান নির্বাচন করুন / Select your location'
                            onChange={this.handleLocationChange}
                            options={CityCorporations}
                            inlineBlock/>
                    }

                    <div>
                        <Button
                            type='submit'
                            label='মোট কর দেখুন / View Total Tax'/>
                    </div>
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