import React, {Component} from 'react';
import {get} from 'object-path';

import Taxes from '../config/Tax';
import Months from '../data/Months';
import InputBlockValues from '../data/InputBlockValues';
import {CityCorporationCheckData,
    CityCorporations} from '../data/LocationSelect';
import {
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
    getTotalTax,
    subtractTDS} from '../utils/utils';
import InputBlock from '../components/lib/InputBlock';
import SelectBlock from '../components/lib/SelectBlock';
import Button from '../components/lib/Button';
import ModalPortal from '../ModalPortal';

class TaxCalculator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalTax: 0,
            enableLocationSelection: false,
            location: null,
            numberOfMonths: 12,
            isModalVisible: false
        };

        this.handleMonthsChange = this.handleMonthsChange.bind(this);
        this.handleCityCorporationCheckChange = this.handleCityCorporationCheckChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    handleMonthsChange(e) {
        e.preventDefault();

        this.setState({
            numberOfMonths: e.target.value
        });
    }

    handleCityCorporationCheckChange(e) {
        e.preventDefault();

        this.setState({
            enableLocationSelection: e.target.value === 'yes' ? true : false
        });
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
            totalInvestment: getInputValue('TotalInvestment'),
            tds: getInputValue('TDS')
        };

        let taxable = {
            basicSalary: getTaxableBasicSalary(inputValues.basicSalary, this.state.numberOfMonths),

            houseRent: getTaxableHouseRent(
                inputValues.houseRent,
                get(Taxes, 'HouseRent.Threshold'),
                inputValues.basicSalary,
                get(Taxes, 'HouseRent.Percentage'),
                this.state.numberOfMonths),

            medicalAllowance: getTaxableMedicalAllowance(
                inputValues.medicalAllowance,
                get(Taxes, 'MedicalAllowance.Threshold'),
                inputValues.basicSalary,
                get(Taxes, 'MedicalAllowance.Percentage'),
                this.state.numberOfMonths),

            conveyanceAllowance: getTaxableConveyanceAllowance(
                inputValues.conveyanceAllowance,
                get(Taxes, 'ConveyanceAllowance.Threshold'),
                this.state.numberOfMonths),

            totalBonus: inputValues.totalBonus
        };

        let totalTaxableIncome = getSumOfObjectValues(taxable);

        let taxLiability  = getTaxLiability(totalTaxableIncome);
        let maxInvestmentAllowance = getInvestmentAllowance(totalTaxableIncome, get(Taxes, 'Investment.Allowance'));
        let taxRebate = getTaxRebate(
            maxInvestmentAllowance,
            inputValues.totalInvestment,
            get(Taxes, 'Investment.TaxRate'));
        let params = this.getTaxAreaParams(this.state.enableLocationSelection, this.state.location);
        let minTax = getMinTax(params.hasArea, params.location);
        let totalTaxWithoutTDS = getTotalTax((taxLiability - taxRebate), minTax);
        let totalTax = subtractTDS(
            inputValues.tds,
            totalTaxWithoutTDS,
            this.state.numberOfMonths);

        this.setState({
            totalTax,
            isModalVisible: true
        });
    }

    hideModal() {
        this.setState({
            isModalVisible: false
        });
    }

    render() {
        return (
            <div>
                <div className='wrapper'>
                    <form onSubmit={this.handleSubmit}>
                        <SelectBlock
                            label='যে কয় মাসের জন্য ট্যাক্স নিরুপণ করতে চান নির্বাচন করুন / Select the number of months you want the calculations for'
                            onChange={this.handleMonthsChange}
                            options={Months}/>

                        {InputBlockValues.map(el => (
                            <InputBlock
                                key={el.id}
                                label={el.label}
                                id={el.id}/>
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
                </div>
                <ModalPortal
                    visible={this.state.isModalVisible}
                    onClose={this.hideModal}
                    totalTax={this.state.totalTax}
                    onClick={this.hideModal}/>
            </div>
        );
    }
}

export default TaxCalculator;