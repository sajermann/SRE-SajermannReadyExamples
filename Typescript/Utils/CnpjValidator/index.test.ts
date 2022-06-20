import '@testing-library/jest-dom';
import cnpjValidator from '.';

describe('Validate CUSTOMERID', () => {
	const customerIdWrongMask = '07.526.557/0001-01';
	const customerIdWrongNoMask = '07526557000101';
	const customerIdCorrectMask = '07.526.557/0001-00';
	const customerIdCorrectNoMask = '07526557000100';
	test('Must result "false" - With Mask', () => {
		const result = cnpjValidator(customerIdWrongMask);
		expect(result).toBeFalsy();
	});
	test('Must result "false" - Without Mask', () => {
		const result = cnpjValidator(customerIdWrongNoMask);
		expect(result).toBeFalsy();
	});
	test('Must result "true" - With Mask', () => {
		const result = cnpjValidator(customerIdCorrectMask);
		expect(result).toBeTruthy();
	});
	test('Must result "true" - Without Mask', () => {
		const result = cnpjValidator(customerIdCorrectNoMask);
		expect(result).toBeTruthy();
	});

	test('Must result "false" - String Empty', () => {
		const result = cnpjValidator('');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - String Length !== 14', () => {
		const result = cnpjValidator('0756265700010');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 00000000000000', () => {
		const result = cnpjValidator('00000000000000');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 11111111111111', () => {
		const result = cnpjValidator('11111111111111');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 22222222222222', () => {
		const result = cnpjValidator('22222222222222');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 33333333333333', () => {
		const result = cnpjValidator('33333333333333');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 44444444444444', () => {
		const result = cnpjValidator('44444444444444');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 55555555555555', () => {
		const result = cnpjValidator('55555555555555');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 66666666666666', () => {
		const result = cnpjValidator('66666666666666');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 77777777777777', () => {
		const result = cnpjValidator('77777777777777');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 88888888888888', () => {
		const result = cnpjValidator('88888888888888');
		expect(result).toBeFalsy();
	});

	test('Must result "false" - 99999999999999', () => {
		const result = cnpjValidator('99999999999999');
		expect(result).toBeFalsy();
	});
});
