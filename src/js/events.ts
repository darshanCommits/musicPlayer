import * as util from "./utils";
import { audio, seekbar } from "./dom";

export const player = {
	/** Updates the display of the seekbar. */
	updateSeekbarDisplay: () => {
		const seekbarValue = (
			(audio.currentTime / audio.duration) *
			100
		).toString();
		seekbar.value = seekbarValue;
		seekbar.style.backgroundSize = `${seekbarValue}% 100%`;
	},

	/** Updates the display of elapsed track time. */
	updateElapsedTrackTimeDisplay: () => {
		const elapsedTime = document.querySelector(
			"#elapsed-time",
		) as HTMLDivElement;
		const currentTime = audio.currentTime;
		const inMinutes = util.convertToMin(currentTime);

		elapsedTime.innerText = inMinutes;
	},
};

export const list = {
	/** Plays the selected track.
	 * @param trackElem - The element representing the track.
	 */
	play: (trackElem: Element) => {
		const totalTime = document.querySelector("#total-time") as HTMLDivElement;
		const trackLink = trackElem?.getAttribute("data-download");
		const trackDuration = trackElem?.getAttribute("data-duration");

		if (trackLink && trackDuration) {
			audio.src = trackLink;
			totalTime.innerText = util.convertToMin(trackDuration);
		} else {
			console.error(`link is ${trackLink}. Duration is ${trackDuration}`);
			throw new Error("Invalid track link!!!");
		}

		audio.play();
	},
};
