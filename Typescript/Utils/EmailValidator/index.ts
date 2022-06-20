export default function emailValidator(str: string): boolean {
	const validRegex =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if (str.match(validRegex) === null) {
		return false;
	}
	return true;
}
