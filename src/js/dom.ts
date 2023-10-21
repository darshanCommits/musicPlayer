import { TrackMetaData } from "./sharedTypes";
import { list } from "./events";

export const seekbar = document.getElementById("seekbar") as HTMLInputElement;
export const audio = document.querySelector("audio") as HTMLAudioElement;
export const trackElement = document.querySelector(
	"#track-art",
) as HTMLDivElement;
export const input = document.querySelector(
	"#search-input",
) as HTMLInputElement;
export const search = document.querySelector(
	"#search-button",
) as HTMLButtonElement;
export const playState = document.querySelector(
	"#play-pause",
) as HTMLButtonElement;
export const trackList = document.querySelector(
	"#list-container",
) as HTMLDivElement;
export const listContainer = document.querySelector(
	"#list-container",
) as HTMLDivElement;

export const getList = (list: TrackMetaData[]) => {
	if (!trackList) throw new Error("element not found");

	return list.reduce((html, track, i) => `${html}${getListItem(track, i)}`, "");
};

export const setPlaybackPosition = () => {
	const seekTime = (audio.duration * parseInt(seekbar.value)) / 100;
	audio.currentTime = seekTime;
};

export const getListItem = (track: TrackMetaData, i: number) => {
	return `
    <div class="list-item flex" data-download="${track.downloadUrl}" data-duration="${track.duration}" data-index="${i}">
      <img src="${track.image}" alt="${track.name}">
      <div class="bruh flex f-col ">
        <h3>${track.name}</h3>
        <h3>${track.album} - ${track.year}</h3>
        <p>${track.primaryArtists}</p>
      </div>
    </div>`;
};

export const playAudio = () => {
	audio.play();
	// console.log(track.image);
};

export const updateTrackInfo = (track: TrackMetaData) => {
	return ` 
		<img src="${track.image}" alt="">
		<div id="track-metadata" class="flex f-col f-cen">
		  <h3>${track.name}</h3>
		  <p>${track.primaryArtists}</p>
		</div>
	`;
};

export const updatePauseBtn = (state: boolean) => {
	state ? (playState.innerText = "⏸") : (playState.innerText = "▶");
};
