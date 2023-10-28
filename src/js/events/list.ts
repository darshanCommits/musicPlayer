import { convertToMin } from "../utils";
import * as dom from "../dom";
import { TrackMetaData } from "../sharedTypes";
import { getMetaData } from "../api";

/** Plays the selected track.
 * @param trackElem - The element representing the track.
 */

export const playTrack = (trackElem: Element) => {
	const totalTime = document.querySelector("#total-time") as HTMLDivElement;
	const trackLink = trackElem?.getAttribute("data-download");
	const trackDuration = trackElem?.getAttribute("data-duration");

	if (trackLink && trackDuration) {
		dom.audio.src = trackLink;
		totalTime.innerText = convertToMin(trackDuration);
	} else {
		console.error(`link is ${trackLink}. Duration is ${trackDuration}`);
		throw new Error("Invalid track link!!!");
	}

	dom.audio.play();
};

/**
 * Create and append the list of tracks.
 * @param trackList - An array of track metadata.
 */

export const loadTrackList = (query: TrackMetaData[], append = false) => {
	const trackList: TrackMetaData[] = query.map(track => getMetaData(track));

	if (trackList.length === 0) throw new Error("NO RESULTS FOUND!");

	const trackItemList = trackList
		.reduce((markup, trackItem) =>
			`${markup}${dom.generateTrackListMarkup(trackItem)}`, "");

	if (append) dom.listContainer.innerHTML += trackItemList;
	else dom.listContainer.innerHTML = trackItemList;
};

export const getTrackDiv = (target : HTMLDivElement) => {
	const isTrack = target.classList.contains("track-card");
	const elem = isTrack ? target : (target.closest(".track-card") as HTMLDivElement);
	
	return elem;
}

