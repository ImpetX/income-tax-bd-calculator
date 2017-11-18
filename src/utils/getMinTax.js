import {get} from 'object-path';

import constants from '../config/Tax';

function getMinTax(isInCityCorporation, location) {
    let minTax = 0;
    if (isInCityCorporation) {
        switch(location) {
            case 'Dhaka':
                minTax = get(constants, 'MinTaxCeiling.CityCorporation.Dhaka');
                break;

            case 'Chittagong':
                minTax = get(constants, 'MinTaxCeiling.CityCorporation.Chittagong');
                break;

            default:
                minTax = get(constants, 'MinTaxCeiling.CityCorporation.Others');
        }
    } else {
        minTax = get(constants, 'MinTaxCeiling.NonCityCorporation');
    }

    return minTax;
}

export default getMinTax;