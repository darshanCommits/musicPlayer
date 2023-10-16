import * as util from "./utils";
import { TrackMetaData } from "./sharedTypes";

/** Represents the audio element. */
export const audio = document.querySelector("audio") as HTMLAudioElement;

/** Represents the play/pause button element. */
export const btn = document.querySelector("#play-pause") as HTMLButtonElement;

/** Represents the seekbar element. */
export const seekbar = document.getElementById("seekbar") as HTMLInputElement;

/** Represents the list container element. */
export const trackList = document.querySelector("#list-container") as HTMLDivElement;

/** Represents the list container element. */
export const listContainer = document.querySelector("#list-container") as HTMLDivElement;

/** Event handlers for player and list actions. */
export const events = {
  player: {
    /** Updates the display of the seekbar. */
    updateSeekbarDisplay: () => {
      const seekbarValue = ((audio.currentTime / audio.duration) * 100).toString();
      seekbar.value = seekbarValue;
      seekbar.style.backgroundSize = `${seekbarValue}% 100%`;
    },

    /** Updates the display of elapsed track time. */
    updateElapsedTrackTimeDisplay: () => {
      const elapsedTime = document.querySelector("#elapsed-time") as HTMLDivElement;
      const currentTime = audio.currentTime;
      const inMinutes = util.convertToMin(currentTime);

      elapsedTime.innerText = inMinutes;
    },
  },

  list: {
    /** Plays the selected track.
     * @param trackElem - The element representing the track.
     */
    play: (trackElem: Element): void => {
      const totalTime = document.querySelector("#total-time") as HTMLDivElement;
      const trackLink = trackElem.getAttribute("data-download");
      const trackDuration = trackElem.getAttribute("data-duration");

      if (trackLink && trackDuration) { 
        audio.src = trackLink;
        totalTime.innerText = util.convertToMin(trackDuration);			
      } else {
        throw new Error("Invalid track link!!!");
      }

      audio.play();
    },
  },
};

/** DOM-related utility functions. */
export const dom = {
  /** Sets the playback position of the audio based on seekbar input. */
  setPlaybackPosition: () => {
    const seekTime = (audio.duration * parseInt(seekbar.value)) / 100;
    audio.currentTime = seekTime;
  },

  /** Generates HTML for a list of tracks.
   * @param list - An array of track metadata.
   * @returns The HTML for the list of tracks.
   * @throws An error if the list container element is not found.
   */
  getList: (list: TrackMetaData[]) => {
    if (!trackList) {
      throw new Error("DOM element not found");
    }
    return list
			.reduce((html, track) => 
				`${html}${dom.getListItem(track)}`, "");
  },

  /** Generates HTML for a single track item.
   * @param track - The metadata of the track.
   * @returns The HTML for the track item.
   */
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

  // Placeholder for getPlayer function
  getPlayer: () => {},
};
