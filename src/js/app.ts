import "normalize.css";
import * as list from "./events/list";
import * as player from "./events/player";
import * as dom from "./dom";
import { getJSON } from "./api";

let page = 1;
const limit = 18;
const initialQuery = "mohit chahuhan";
const initialHash = `page=${page}&limit=${limit}&query=${initialQuery}`;

let append = false;
let prevHash = "";
let currentTrackDiv: HTMLDivElement;
const trackHistory: Set<HTMLDivElement> = new Set();

Object.defineProperty(window, "currentTrackDiv", {
	get() {
		return currentTrackDiv;
	},
	set(trackElem: HTMLDivElement) {
		currentTrackDiv = trackElem;

		trackHistory.add(trackElem);
		list.playTrack(trackElem);
		player.updatePauseBtn(true);

		const updatedTrackInfo = dom.generateNowPlayingMarkup(trackElem);
		if (updatedTrackInfo) dom.trackElement.innerHTML = updatedTrackInfo;
	}
});

const currentTrack = Object.getOwnPropertyDescriptor(window, "currentTrackDiv") as PropertyDescriptor & {
	set: (value: HTMLDivElement) => void;
};

document.addEventListener("DOMContentLoaded", () => {
	window.location.hash = "";
	window.location.hash = initialHash;
});

window.addEventListener("hashchange", async () => {
	const newHash = window.location.hash.substring(1);
	const query = new URLSearchParams(newHash).get("query");

	if (prevHash === newHash || query === "") return;

	if (newHash === "history") dom.listContainer.innerHTML = dom.convertTrackSetToHTML(trackHistory);
	else {
		const json = await getJSON(newHash);
		list.loadTrackList(json, append);
	}

	prevHash = newHash;
});

dom.search.addEventListener("click", async e => {
	e.preventDefault();
	page = 1;
	append = false;
	const newHash = `page=${page}&limit=${limit}&query=${dom.input.value}`;

	if (newHash === prevHash) return;

	window.location.hash = newHash;
});

dom.btnNext.addEventListener("click", async () => {
	append = true;
	const query = new URLSearchParams(prevHash.substring(1)).get("query");
	window.location.hash = `page=${++page}&limit=${limit}&query=${query}`;
});

dom.seekbar.addEventListener("input", player.setPlaybackPosition);

dom.audio.addEventListener("timeupdate", () => {
	player.updateElapsedTrackTimeDisplay();
	player.updateSeekbarDisplay();
});

dom.listContainer.addEventListener("click", e => {
	const target = e.target as HTMLDivElement;
	const elem = list.getTrackDiv(target);
	currentTrack.set(elem);
});

dom.audio.addEventListener("ended", () => {
	const nextTrack = currentTrackDiv.nextElementSibling as HTMLDivElement;
	currentTrack.set(nextTrack);
});

dom.playState.addEventListener("click", () => {
	const state = dom.audio.paused;
	player.updatePlaybackState(state);
	player.updatePauseBtn(state);
});

dom.btnHistory.addEventListener("click", () => {
	window.location.hash = "history";
});

dom.trackNext.addEventListener("click", () => {
	const nextTrack = currentTrackDiv.nextElementSibling as HTMLDivElement;
	if (!nextTrack) return;
	currentTrack.set(nextTrack);
});

dom.trackPrev.addEventListener("click", () => {
	const prevTrack = currentTrackDiv?.previousElementSibling as HTMLDivElement;

	if (!prevTrack || dom.audio.currentTime > 3) dom.audio.currentTime = 0;
	else currentTrack.set(prevTrack);
});
