import {get} from 'object-path';

import Taxes from '../config/Tax';

function getMinTax(isInCityCorporation, location) {
    let minTax = 0;
    if (isInCityCorporation) {
        switch(location) {
            case 'Dhaka':
                minTax = get(Taxes, 'MinTaxCeiling.CityCorporation.Dhaka');
                break;

            case 'Chittagong':
                minTax = get(Taxes, 'MinTaxCeiling.CityCorporation.Chittagong');
                break;

            default:
                minTax = get(Taxes, 'MinTaxCeiling.CityCorporation.Others');
        }
    } else {
        minTax = get(Taxes, 'MinTaxCeiling.NonCityCorporation');
    }

    return minTax;
}

export default getMinTax;