import * as util from "./utils";
import { TrackMetaData } from "./sharedTypes";

export const audio = document.querySelector("audio") as HTMLAudioElement;
export const btn = document.querySelector("#play-pause") as HTMLButtonElement;
export const seekbar = document.getElementById("seekbar") as HTMLInputElement;

export const events = {
	player: {
		trackSeekbar: () => {
			const seekbarValue = (
				(audio.currentTime / audio.duration) *
				100
			).toString();
			seekbar.value = seekbarValue;
			seekbar.style.backgroundSize = `${seekbarValue}% 100%`;
		},

		trackDurationTracker: () => {
			const currentTime = audio.currentTime;
			const inMinutes = util.convertToMin(currentTime);

			const elapsedTime = document.querySelector(
				"#elapsed-time",
			) as HTMLDivElement;
			elapsedTime.innerText = inMinutes;
		},
	},
}

export const dom = {
	getListItem : (track: TrackMetaData ) => {
		return `
		  <div class="list-item flex">
		    <img src="${track.image}" alt="${track.name}">
		    <div class="flex f-col ">
		      <h3>${track.name}</h3>
		      <p>${track.artists}</p>
		    </div>
		  </div>`
	}
}
