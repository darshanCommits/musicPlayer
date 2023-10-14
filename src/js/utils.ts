export function convertToMin(seconds) {
	if (isNaN(seconds) || seconds < 0) {
		return "Invalid input";
	}

	const minutes = Math.floor(seconds / 60);
	const remainingSeconds = Math.round(seconds % 60); // Round to the nearest second

	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(remainingSeconds).padStart(2, "0");

	return `${formattedMinutes}:${formattedSeconds}`;
}
