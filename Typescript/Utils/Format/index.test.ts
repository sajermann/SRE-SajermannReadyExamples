import '@testing-library/jest-dom';
import { addCnpjMask, removeCnpjMask, formatForReal } from '.';

describe('Validate addCnpjMask', () => {
	const cnpjCorrectWithoutMask = '07526557000100';
	const cnpjCorrectWithMask = '07.526.557/0001-00';

	const cnpjInCorrectWithoutMask = '0752655700010';
	const cnpjInCorrectWithoutMask2 = '075265570001000';
	const cnpjInCorrectWithoutMask3 = '075265570001/0';
	const cnpjInCorrectWithoutMask4 = '07.526.557/000';

	test(`Must result ${cnpjCorrectWithMask}`, () => {
		const result = addCnpjMask(cnpjCorrectWithoutMask);
		expect(result).toEqual(cnpjCorrectWithMask);
	});

	test(`Must result ${cnpjInCorrectWithoutMask}`, () => {
		const result = addCnpjMask(cnpjInCorrectWithoutMask);
		expect(result).toEqual(cnpjInCorrectWithoutMask);
	});

	test(`Must result ${cnpjInCorrectWithoutMask2}`, () => {
		const result = addCnpjMask(cnpjInCorrectWithoutMask2);
		expect(result).toEqual(cnpjInCorrectWithoutMask2);
	});

	test(`Must result ${cnpjInCorrectWithoutMask3}`, () => {
		const result = addCnpjMask(cnpjInCorrectWithoutMask3);
		expect(result).toEqual(cnpjInCorrectWithoutMask3);
	});

	test(`Must result ${cnpjInCorrectWithoutMask4}`, () => {
		const result = addCnpjMask(cnpjInCorrectWithoutMask4);
		expect(result).toEqual(cnpjInCorrectWithoutMask4);
	});
});

describe('Validate removeCnpjMask', () => {
	const cnpjWithMask = '07.526.557/0001-00';
	const cnpjWithoutMask = '07526557000100';

	test(`Must result ${cnpjWithoutMask}`, () => {
		const result = removeCnpjMask(cnpjWithMask);
		expect(result).toEqual(cnpjWithoutMask);
	});
});

describe('Validate formatForReal', () => {
	const valueWithoutMask = 10.99;
	const valueWithMask = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	}).format(10.99);

	test(`Must result ${valueWithMask}`, () => {
		const result = formatForReal(valueWithoutMask);
		expect(result).toEqual(valueWithMask);
	});
});
