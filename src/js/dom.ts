import { TrackMetaData } from "./sharedTypes";
import { convertToMin } from "./utils";
// import { list } from "./events";

export const btnNext = document.querySelector("#btn-next") as HTMLButtonElement;
export const btnHistory = document.querySelector(
	".btn-history",
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
) as HTMLButtonElement;
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

	return list.reduce(
		(html, track) => `${html}${generateTrackListItem(track)}`,
		"",
	);
};

/**
 * Generates HTML for an individual track item.
 *
 * @param track - The track metadata.
 * @returns List item component.
 */

export const generateTrackListItem = (track: TrackMetaData) => {
	const listItemStyles =
		"relative track-card flex p-4 transition-all border-red border focus:border-2 hover:scale-[1.02] hover:-translate-y-2 active:scale-[0.98] active:translate-y-0";
	const imageStyles = "w-[4.25rem] h-[4.25rem]";
	const textStyles = "flex flex-col ml-4 mt-[2px]";
	const trackNameStyles = "text-md font-semibold";
	const trackAlbumStyles = "text-sm my-1";
	const trackYearStyles = "absolute right-4 text-sm";
	const trackDurationStyles = "absolute bottom-4 right-4 text-sm";
	const primaryArtistsStyles = "text-sm text-gray-txt";

	const duration = convertToMin(track.duration);

	return `
		<div class="${listItemStyles}" data-download="${track.downloadUrl}" data-duration="${track.duration}" tabindex="-1">
		  <img class="${imageStyles}" src="${track.image}" alt="${track.name}">
		  <div class="${textStyles}">
		    <h3 class="${trackNameStyles}">${track.name}</h3>
		    <h3 class="${trackAlbumStyles}">${track.album}</h3>
		    <p class="${primaryArtistsStyles}">${track.primaryArtists}</p>
		    <span class="${trackYearStyles}">${track.year}</span>
		    <span class="${trackDurationStyles}">${duration}</span>
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
	if (!trackElem) {
		console.error(`${trackElem} is missing`);
		return null;
	}
	const imgElem = trackElem.querySelector("img") as HTMLImageElement | null;
	const pElem = trackElem.querySelector("p") as HTMLParagraphElement | null;
	if (!imgElem || !pElem) {
		console.error(`${imgElem} || ${pElem} is missing`);
		return null;
	}

	const trackName = imgElem.getAttribute("alt") || null;
	const albumArt = imgElem.getAttribute("src") || null;
	const artists = pElem.innerText;

	const imgStyles = "w-[4.25rem] mr-4";
	const divStyles = "sm:mr-24";
	const h3Styles = "font-semibold text-lg whitespace-nowrap overflow-hidden overflow-ellipsis w-44";
	const pStyles = "w-44 text-gray-txt";

	return `
		<img src="${albumArt}" alt="${trackName}" class="${imgStyles}">
    <div id="track-metadata" class="${divStyles}">
      <h3 class="${h3Styles}">${trackName}</h3>
      <p class="${pStyles}">${artists}</p>
		</div>
				`;
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
