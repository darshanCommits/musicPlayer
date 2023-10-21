import * as util from "./utils";
import * as dom from "./dom";
import { fetchSearchResult } from "./api";
import { TrackMetaData } from "./sharedTypes";

/**
 * Player functions for controlling playback and display.
 */ 
export const player = {

	/**
	 * Update the playback state (play/pause).
	 * @param state - True to play, false to pause.
	 */
	 updatePlaybackState: (state: boolean) => {
		state ? dom.audio.play() : dom.audio.pause();
	},

  /**
   * Update the display of the seekbar.
   */
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


/**
 * Functions for managing and controlling the list of tracks.
 */
export const list = {
	/** Plays the selected track.
	 * @param trackElem - The element representing the track.
	 */
	playTrack: (trackElem: Element) => {
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

		dom.audio.play();
	},

  /**
   * Create a list of tracks.
   * @param trackList - An array of track metadata.
   */
  	createTrackList: (trackList: TrackMetaData[]) => {
		const musicItemList = dom.getList(trackList);
		dom.listContainer.innerHTML = musicItemList;
	},
};

/**
 * Functions for searching and controlling search functionality.
 */
export const search = {
  /**
   * Update the URL hash with a search query.
   * @param query - The search query.
   */
  updateHash: (query: string) => {
		window.location.hash = query;
	},

	/**
   * Perform a music search based on the given query.
   * @param query - The search query.
   */
	performSearch: async (query: string) => {
		const trackList = await fetchSearchResult(query);
		list.createTrackList(trackList);
	},
};
