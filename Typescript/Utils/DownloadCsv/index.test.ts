import downloadCsv from '.';

describe('Utils/DownloadCsv', () => {
	it('Should download the file', () => {
		const link = {
			click: jest.fn(),
		};
		global.URL.createObjectURL = jest.fn(() => 'https://ambev.com');
		global.URL.revokeObjectURL = jest.fn();
		jest.spyOn(document, 'createElement').mockImplementation(() => link as any);
		downloadCsv({ data: 'test-file; teste; batata', nameFile: 'test' });
		expect(link.click).toHaveBeenCalledTimes(1);
	});
});
