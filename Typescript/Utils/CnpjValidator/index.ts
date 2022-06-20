/* eslint-disable no-plusplus */
/* eslint-disable prettier/prettier */
export default function cnpjValidator(customerId: string): boolean {
		const customerIdForVerify = customerId.replace(/[^\d]+/g,'');

    if(customerIdForVerify === '') {
			return false;
		}

    if (customerIdForVerify.length !== 14){
			return false;
		}

    if (
			customerIdForVerify === "00000000000000" ||
			customerIdForVerify === "11111111111111" ||
			customerIdForVerify === "22222222222222" ||
			customerIdForVerify === "33333333333333" ||
			customerIdForVerify === "44444444444444" ||
			customerIdForVerify === "55555555555555" ||
			customerIdForVerify === "66666666666666" ||
			customerIdForVerify === "77777777777777" ||
			customerIdForVerify === "88888888888888" ||
			customerIdForVerify === "99999999999999"
			) {return false;}

			// Valida DVs
    let lengthCustomerId = customerIdForVerify.length - 2
    let numberWithoutDv = customerIdForVerify.substring(0,lengthCustomerId);
    const dv = customerIdForVerify.substring(lengthCustomerId);
    let sum = 0;
    let pos = lengthCustomerId - 7;
    for (let i = lengthCustomerId; i >= 1; i--) {
      sum += parseInt(numberWithoutDv.charAt(lengthCustomerId - i),10) * pos--;
      if (pos < 2) {
				pos = 9;
			}
    }
    let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(dv.charAt(0),10)) {
			return false;
		}

    lengthCustomerId += 1;
    numberWithoutDv = customerIdForVerify.substring(0,lengthCustomerId);
    sum = 0;
    pos = lengthCustomerId - 7;
    for (let i = lengthCustomerId; i >= 1; i--) {
      sum += parseInt(numberWithoutDv.charAt(lengthCustomerId - i),10) * pos--;
      if (pos < 2) {
				pos = 9;
			}
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result !== parseInt(dv.charAt(1),10)) {
			return false;
		}

    return true;
}
