import { TrackMetaData } from "./sharedTypes";
// import { list } from "./events";

export const btnNext = document.querySelector("#btn-next") as HTMLButtonElement;
export const btnHistory = document.querySelector("#btn-history") as HTMLButtonElement;
export const audio = document.querySelector("audio") as HTMLAudioElement;
export const seekbar = document.getElementById("seekbar") as HTMLInputElement;
export const input = document.querySelector("#search-input") as HTMLInputElement;
export const trackElement = document.querySelector("#track-art") as HTMLDivElement;
export const search = document.querySelector("#search-button") as HTMLButtonElement;
export const playState = document.querySelector("#play-pause") as HTMLButtonElement;
export const listContainer = document.querySelector("#list-container") as HTMLDivElement;
export const historyContainer = document.querySelector("#history-container") as HTMLDivElement;

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
 * Converts a Set(DS) of HTMLDivElement elements representing tracks into an HTML string.
 *
 * @param trackList - The set of HTMLDivElement elements representing tracks.
 * @returns The resulting HTML string.
 */
export const convertSetToHtml = (trackList : Set<HTMLDivElement>) => {
	let result = "";

	for(const track of trackList) 
		result += track.outerHTML;

	return result;
}
