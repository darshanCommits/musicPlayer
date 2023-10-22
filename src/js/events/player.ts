import * as dom from "../dom";
import { convertToMin } from "../utils";

/**
 * Update the display of the seekbar.
 */
export const updateSeekbarDisplay = () => {
    const seekbarValue = (
        (dom.audio.currentTime / dom.audio.duration) *
        100
    ).toString();
    dom.seekbar.value = seekbarValue;
    dom.seekbar.style.backgroundSize = `${seekbarValue}% 100%`;
};

/**
 * Sets the playback position based on the seekbar value.
 */
export const setPlaybackPosition = () => {
    const seekTime = (dom.audio.duration * parseInt(dom.seekbar.value)) / 100;
    dom.audio.currentTime = seekTime;
};

/**
 * Updates the display of elapsed track time.
 */
export const updateElapsedTrackTimeDisplay = () => {
    const elapsedTime = document.querySelector(
        "#elapsed-time",
    ) as HTMLDivElement;
    const currentTime = dom.audio.currentTime;
    const inMinutes = convertToMin(currentTime);

    elapsedTime.innerText = inMinutes;
};

/**
 * Updates the play/pause button state in the UI.
 * @param state - True if playing, false if paused.
 */
export const updatePauseBtn = (state: boolean) => {
    if (state) dom.playState.innerText = "⏸";
    else dom.playState.innerText = "▶";
};

/**
 * Update the playback state (play/pause).
 * @param state - True to play, false to pause.
 */
export const updatePlaybackState = (state: boolean) => {
    state ? dom.audio.play() : dom.audio.pause();
};


