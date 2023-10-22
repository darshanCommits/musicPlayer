import { convertToMin } from "../utils";
import * as dom from "../dom";
import { JsonResponse, TrackMetaData } from "../sharedTypes";
import { fetchSearchResult } from "../api";

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
 * Create a list of tracks.
 * @param trackList - An array of track metadata.
 */
export const createTrackList = (trackList: TrackMetaData[], append = false) => {
	const musicItemList = dom.getList(trackList);
	if(append)
		dom.listContainer.innerHTML += musicItemList;
	else
		dom.listContainer.innerHTML = musicItemList;
};

export const loadTrackList = (query: JsonResponse, append = false) => {
	const trackList = fetchSearchResult(query);
	if(trackList.length !== 0)	createTrackList(trackList, append);
};
