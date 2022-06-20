import { dateForReport } from 'Utils/StringVsDate';

interface IProps {
	data: Blob;
	nameFile: string;
}
export default function DownloadCsvBlob({ data, nameFile }: IProps) {
	const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
	const blob = new Blob([BOM, data], { type: 'application/csv' });
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = `${dateForReport()} ${nameFile}.csv`;
	link.click();
}
