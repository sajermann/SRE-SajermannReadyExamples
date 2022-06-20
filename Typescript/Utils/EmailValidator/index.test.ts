import emailValidator from '.';

describe('Utils/EmailValidator', () => {
	const emailWrong1 = 'test.com';
	const emailWrong2 = 'test@.';
	const emailWrong3 = 'test.com@test.';
	const emailCorrectly1 = 'test@gmail.com';
	const emailCorrectly2 = 'test@ab-inbev.com';
	const emailCorrectly3 = 'test-ext@ab-inbev.com';

	it(`Must return Falsy`, () => {
		expect(emailValidator(emailWrong1)).toBeFalsy();
	});

	it(`Must return Falsy`, () => {
		expect(emailValidator(emailWrong2)).toBeFalsy();
	});

	it(`Must return Falsy`, () => {
		expect(emailValidator(emailWrong3)).toBeFalsy();
	});

	it(`Must return Truthy`, () => {
		expect(emailValidator(emailCorrectly1)).toBeTruthy();
	});

	it(`Must return Truthy`, () => {
		expect(emailValidator(emailCorrectly2)).toBeTruthy();
	});

	it(`Must return Truthy`, () => {
		expect(emailValidator(emailCorrectly3)).toBeTruthy();
	});
});
