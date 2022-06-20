import '@testing-library/jest-dom';
import readFileAsync from '.';

describe('Validate GenerateNumbers', () => {
	test('Must result string with 10 of length', async () => {
		const t = new File(['5615615165'], 'duiasiduhfauisdh');
		const result = await readFileAsync(t);
		expect(result).toEqual(
			'data:application/octet-stream;base64,NTYxNTYxNTE2NQ=='
		);
	});
});
