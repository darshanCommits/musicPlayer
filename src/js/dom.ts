import { TrackMetaData } from "./sharedTypes";
// import { list } from "./events";

export const loadMore = document.querySelector("#load-more") as HTMLButtonElement;
export const audio = document.querySelector("audio") as HTMLAudioElement;
export const seekbar = document.getElementById("seekbar") as HTMLInputElement;
export const input = document.querySelector("#search-input") as HTMLInputElement;
export const trackElement = document.querySelector("#track-art") as HTMLDivElement;
export const search = document.querySelector("#search-button") as HTMLButtonElement;
export const playState = document.querySelector("#play-pause") as HTMLButtonElement;
export const listContainer = document.querySelector("#list-container") as HTMLDivElement;

/**
 * Generates the HTML list for a collection of tracks.
 *
 * @param list - An array of track metadata.
 * @returns The list component.
 */
export const getList = (list: TrackMetaData[]) => {
	if (!listContainer) throw new Error("element not found");

	return list
		.reduce((html, track, i) =>
			`${html}${getListItem(track, i)}`, "");
};

/**
 * Sets the playback position based on the seekbar value.
 */
export const setPlaybackPosition = () => {
	const seekTime = (audio.duration * parseInt(seekbar.value)) / 100;
	audio.currentTime = seekTime;
};

/**
 * Generates HTML for an individual track item.
 *
 * @param track - The track metadata.
 * @param i - The index of the track.
 * @returns List item component.
 */
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

/**
 * Updates the track information in the player.
 *
 * @param track - The track metadata.
 * @returns Component for player UI.
 */
export const updateTrackInfo = (track: TrackMetaData) => {
	return ` 
		<img src="${track.image}" alt="">
		<div id="track-metadata" class="flex f-col f-cen">
		  <h3>${track.name}</h3>
		  <p>${track.primaryArtists}</p>
		</div>
	`;
};

/**
 * Updates the play/pause button state in the UI.
 *
 * @param state - True if playing, false if paused.
 */
export const updatePauseBtn = (state: boolean) => {
	if (state) playState.innerText = "⏸";
	else playState.innerText = "▶";
};
