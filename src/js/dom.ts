import { TrackMetaData } from "./sharedTypes";
// import { list } from "./events";

export const btnNext = document.querySelector("#btn-next") as HTMLButtonElement;
export const btnHistory = document.querySelector(
	"#btn-history",
) as HTMLButtonElement;
export const audio = document.querySelector("audio") as HTMLAudioElement;
export const seekbar = document.getElementById("seekbar") as HTMLInputElement;
export const input = document.querySelector(
	"#search-input",
) as HTMLInputElement;
export const trackElement = document.querySelector(
	"#track-art",
) as HTMLDivElement;
export const search = document.querySelector(
	"#search-button",
) as HTMLInputElement;
export const playState = document.querySelector(
	"#play-pause",
) as HTMLButtonElement;
export const listContainer = document.querySelector(
	"#list-container",
) as HTMLDivElement;
export const historyContainer = document.querySelector(
	"#history-container",
) as HTMLDivElement;

/**
 * Generates the HTML list for a collection of tracks.
 *
 * @param list - An array of track metadata.
 * @returns The list component.
 */

export const generateTrackListHTML = (list: TrackMetaData[]) => {
	if (!listContainer) throw new Error("element not found");

	return list.reduce((html, track) => `${html}${generateTrackListItem(track )}`, "");
};

/**
 * Generates HTML for an individual track item.
 *
 * @param track - The track metadata.
 * @returns List item component.
 */

export const generateTrackListItem = (track: TrackMetaData) => {
	const listItemStyles =
		"relative track-card flex border border-red p-4 cursor-pointer transition-all active:scale-90";
	const imageStyles = "w-16 h-16 object-cover ";
	const textStyles = "flex flex-col ml-4";
	const trackNameStyles = "text-sm font-semibold";
	const trackDetailsStyles = "text-sm";
	const trackYearStyles = "absolute right-4 text-sm";
	const primaryArtistsStyles = "text-sm text-gray-600";

	return `
		<div class="${listItemStyles}" data-download="${track.downloadUrl}" data-duration="${track.duration}">
		  <img class="${imageStyles}" src="${track.image}" alt="${track.name}">
		  <div class="${textStyles}">
		    <h3 class="${trackNameStyles}">${track.name}</h3>
		    <h3 class="${trackDetailsStyles}">${track.album}</h3>
		    <span class="${trackYearStyles}">${track.year}</span>
		    <p class="${primaryArtistsStyles}">${track.primaryArtists}</p>
		  </div>
		</div>
		`;
};

/**
 * Retrieves the updated Now Playing MetaData.
 *
 * @param trackElem - The track element.
 * @returns Component for player UI.
 */

export const updateNowPlaying = (trackElem: HTMLDivElement) => {
	if (!trackElem) return null;
	const imgElem = trackElem.querySelector("img") as HTMLImageElement | null;
	const pElem = trackElem.querySelector("p") as HTMLParagraphElement | null;
	if(!imgElem || !pElem) return null;

	const albumArt = imgElem.getAttribute("src") || null;
	const trackName = imgElem.getAttribute("alt") || null;
	const artists = pElem.innerText ;

	return`<img src="${albumArt}" alt="${trackName}" class="w-16 h-16">
		      <div id="track-metadata" class="ml-4">
	        <h3 class="text-lg font-semibold">${trackName}</h3>
	        <p class="w-52 text-gray-600">${artists}</p>
	      </div>
				`
};


/**
 * Converts a Set(DS) of HTMLDivElement elements representing tracks into an HTML string.
 *
 * @param trackSet - The set of HTMLDivElement elements representing tracks.
 * @returns The resulting HTML string.
 */
export const convertTrackSetToHTML = (trackSet: Set<HTMLDivElement>) => {
	let result = "";

	for (const track of trackSet) result += track.outerHTML;

	return result;
};
