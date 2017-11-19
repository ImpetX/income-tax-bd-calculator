import multiplyByMonths from './multiplyByMonths';

function getTaxableConveyanceAllowance(conveyanceAllowance, thresholdConveyanceAllowance, months) {

    return multiplyByMonths(conveyanceAllowance, months) > thresholdConveyanceAllowance ? multiplyByMonths(conveyanceAllowance, months) - thresholdConveyanceAllowance : 0;
}

export default getTaxableConveyanceAllowance;