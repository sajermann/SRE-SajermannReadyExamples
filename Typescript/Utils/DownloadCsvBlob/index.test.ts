import downloadCsvBlob from '.';

describe('Utils/DownloadCsvBlob', () => {
	it('Should download the file', () => {
		const link = {
			click: jest.fn(),
		};
		const aFileParts = ['id;name'];
		const oMyBlob = new Blob(aFileParts, { type: 'application/csv' }); // o blob
		global.URL.createObjectURL = jest.fn(() => 'https://ambev.com');
		global.URL.revokeObjectURL = jest.fn();
		jest.spyOn(document, 'createElement').mockImplementation(() => link as any);
		downloadCsvBlob({ data: oMyBlob, nameFile: 'Test' });
		expect(link.click).toHaveBeenCalledTimes(1);
	});
});
