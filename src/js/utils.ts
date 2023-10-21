/**
 * Converts seconds to a formatted time string (e.g., "mm:ss").
 * @param seconds - The number of seconds to convert.
 * @returns The formatted time string.
 */
export function convertToMin(seconds: number | string) {
	const secs = typeof seconds === "number" ? seconds : parseFloat(seconds);

	if (isNaN(secs) || secs < 0)	return "Invalid input";

	const minutes = Math.floor(secs / 60);
	const remainingSeconds = Math.round(secs % 60); // Round to the nearest second

	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(remainingSeconds).padStart(2, "0");

	return `${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Truncates a text string to a specified length with an ellipsis.
 * @param text - The text to truncate.
 * @param length - The maximum length of the truncated text.
 * @param ellipsis - The ellipsis string to append (default: "...").
 * @returns The truncated text.
 */
export function textAbstract(text: string, length: number, ellipsis = "...") {
	if (text.length <= length) return text;
	if (text === null) return "";

	const lastSpaceIndex = text.lastIndexOf(" ", length);
	if (lastSpaceIndex === -1) return text.substring(0, length) + ellipsis;

	return text.substring(0, lastSpaceIndex) + ellipsis;
}
