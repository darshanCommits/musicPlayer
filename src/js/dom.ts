import * as util from "./utils";
import { TrackMetaData } from "./sharedTypes";

export const audio = document.querySelector("audio") as HTMLAudioElement;
export const btn = document.querySelector("#play-pause") as HTMLButtonElement;
export const seekbar = document.getElementById("seekbar") as HTMLInputElement;
export const trackList = document.querySelector("#list-container") as HTMLDivElement;
export const listContainer = document.querySelector("#list-container") as HTMLDivElement;

export const events = {

	player: {
		updateSeekbarDisplay: () => {
			const seekbarValue = ((audio.currentTime / audio.duration) * 100).toString();
			seekbar.value = seekbarValue;
			seekbar.style.backgroundSize = `${seekbarValue}% 100%`;
		},

		updateElapsedTrackTimeDisplay: () => {
			const elapsedTime = document.querySelector("#elapsed-time") as HTMLDivElement;
			const currentTime = audio.currentTime;
			const inMinutes = util.convertToMin(currentTime);

			elapsedTime.innerText = inMinutes;
		},
	},

	list: {
		play: (trackElem: Element): void => {
			const totalTime = document.querySelector("#total-time") as HTMLDivElement;
			const trackLink = trackElem.getAttribute("data-download");
			const trackDuration = trackElem.getAttribute("data-duration");

			if (trackLink && trackDuration){ 
				audio.src = trackLink;
				totalTime.innerText = util.convertToMin(trackDuration);			
			}	else throw new Error("Invalid track link!!!");

			audio.play();
		},
	},
};


export const dom = {

	setPlaybackPosition: () => {
		const seekTime = (audio.duration * parseInt(seekbar.value)) / 100;
		audio.currentTime = seekTime;
	},

	getList: (list: TrackMetaData[]) => {
		if (!trackList) throw new Error("DOM element not found");
		return list.reduce((html, track) => `${html}${dom.getListItem(track)}`, "");
	},

	getListItem: (track: TrackMetaData) => {
		return `
		  <div class="list-item flex" data-download="${track.downloadUrl}" data-duration="${track.duration}">
		    <img src="${track.image}" alt="${track.name}">
		    <div class="flex f-col ">
		      <h3>${track.name}</h3>
		      <h3>${track.album}</h3>
		      <p>${track.primaryArtists}</p>
		    </div>
		  </div>`;
	},

	getPlayer: () => {},
};
