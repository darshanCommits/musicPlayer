export function convertToMin(seconds: number | string) {
	const secs = typeof seconds === "number" 
		? seconds 
		: parseFloat(seconds);

	if (isNaN(secs) || secs < 0) {
		return "Invalid input";
	}

	const minutes = Math.floor(secs / 60);
	const remainingSeconds = Math.round(secs % 60); // Round to the nearest second

	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(remainingSeconds).padStart(2, "0");

	return `${formattedMinutes}:${formattedSeconds}`;
}

export function textAbstract(text: string, length: number, ellipsis = "...") {
	if (text.length <= length) return text;
	if (text === null) return "";

	let abstractedTest = text.substring(0, length);
	const lastWord = abstractedTest.lastIndexOf(" "); // this will check if any word was cut in between

	abstractedTest = abstractedTest.substring(0, lastWord) + ellipsis;

	return abstractedTest;
}
