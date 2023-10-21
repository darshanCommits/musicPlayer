import * as util from "./utils";
import * as dom from "./dom";
import { TrackMetaData } from "./sharedTypes";

export const player = {
	updatePlayState: (state : boolean) => {
		state ? dom.audio.play() : dom.audio.pause();
	},

	/** Updates the display of the seekbar. */
	updateSeekbarDisplay: () => {
		const seekbarValue = (
			(dom.audio.currentTime / dom.audio.duration) *
			100
		).toString();
		dom.seekbar.value = seekbarValue;
		dom.seekbar.style.backgroundSize = `${seekbarValue}% 100%`;
	},

	/** Updates the display of elapsed track time. */
	updateElapsedTrackTimeDisplay: () => {
		const elapsedTime = document.querySelector(
			"#elapsed-time",
		) as HTMLDivElement;
		const currentTime = dom.audio.currentTime;
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
			dom.audio.src = trackLink;
			totalTime.innerText = util.convertToMin(trackDuration);
		} else {
			console.error(`link is ${trackLink}. Duration is ${trackDuration}`);
			throw new Error("Invalid track link!!!");
		}

		dom.playAudio();
	},

	createList : (trackList: TrackMetaData[]) => {
		const musicItemList = dom.getList(trackList);
		dom.trackList.innerHTML = musicItemList;
	},
	
};
