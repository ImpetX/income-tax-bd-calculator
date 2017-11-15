import getYearlyGross from './getYearlyGross';

function getTaxableConveyanceAllowance(conveyanceAllowance) {
    const THRESHOLD_CONVEYANCE_ALLOWANCE = 30000;

    return getYearlyGross(conveyanceAllowance) > THRESHOLD_CONVEYANCE_ALLOWANCE ? getYearlyGross(conveyanceAllowance) - THRESHOLD_CONVEYANCE_ALLOWANCE : 0;
}

export default getTaxableConveyanceAllowance;