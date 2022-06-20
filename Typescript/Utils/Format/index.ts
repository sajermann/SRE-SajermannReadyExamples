/**
 * ## addCnpjMask
 * ### Add Mask in Cnpj
 * @example "07526557000100"
 * @returns "07.526.557/0001-00"
 */
export function addCnpjMask(value: string): string {
	if (value.length !== 14) {
		return value;
	}
	return value.replace(
		/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
		'$1.$2.$3/$4-$5'
	);
}

/**
 * ## removeCnpjMask
 * ### Add Mask in Cnpj
 * @example "07.526.557/0001-00"
 * @returns "07526557000100"
 */
export function removeCnpjMask(value: string): string {
	return value.replace(/[^\d]+/g, '');
}

/**
 * ## formatForReal
 * ### Format number from number to currency's Brazil
 * @example 10.99
 * @returns "R$ 10,99"
 */
export function formatForReal(value: number): string {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(value);
}
