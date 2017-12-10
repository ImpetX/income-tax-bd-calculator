import {get} from 'object-path';

import Taxes from '../config/Tax';

function getTaxLiability(taxableIncome) {
    let taxLiability = 0;

    if (taxableIncome >= get(Taxes, 'TaxFreeThreshold.Group_1.Income')) {
        taxableIncome = taxableIncome - get(Taxes, 'TaxFreeThreshold.Group_1.Income');

        if(taxableIncome <= 0) {
            return taxLiability;
        }

        else {
            let reservedTax = taxableIncome > get(Taxes, 'TaxFreeThreshold.Group_2.Income') ? taxableIncome - get(Taxes, 'TaxFreeThreshold.Group_2.Income') : 0;

            taxableIncome = reservedTax === 0 ? taxableIncome : get(Taxes, 'TaxFreeThreshold.Group_2.Income');
            taxLiability+= taxableIncome * get(Taxes, 'TaxFreeThreshold.Group_2.TaxRate');
            taxableIncome = reservedTax;

            if(taxableIncome <= 0) {
                return taxLiability;
            }

            else {
                taxLiability+= taxableIncome * get(Taxes, 'TaxFreeThreshold.Rest.TaxRate');
                return taxLiability;
            }
        }
    }

    return taxLiability;
}

export default getTaxLiability;