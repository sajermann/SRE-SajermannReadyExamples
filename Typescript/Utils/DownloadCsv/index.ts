interface IProps {
	data: string;
	nameFile: string;
}
export default function DownloadCsv({ nameFile, data }: IProps) {
	const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
	const blob = new Blob([BOM, data]);
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);
	link.download = `${nameFile}.csv`;
	link.click();
	URL.revokeObjectURL(link.href);
}
