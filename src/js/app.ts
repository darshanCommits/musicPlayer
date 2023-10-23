import "normalize.css";
import * as list from "./events/list";
import * as player from "./events/player";
import * as dom from "./dom";
import { getJSON } from "./api";

const limit = 9;
let page = 1;
let append = false;
let prevHash = "";
let currentTrackDiv: HTMLDivElement;
const trackHistory: Set<HTMLDivElement> = new Set();

(async () => {
	const initialHash = `page=${page}&limit=${limit}&query=english`;
	const json = await getJSON(initialHash);
	list.loadTrackList(json);

	window.location.hash = initialHash;
})();

dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	page = 1;
	append = false;
	const newHash = `page=${page}&limit=${limit}&query=${dom.input.value}`;

	if (newHash === prevHash) return;

	window.location.hash = newHash;
});

dom.btnNext.addEventListener("click", async () => {
	const query = new URLSearchParams(prevHash.substring(1)).get("query");
	append = true;
	window.location.hash = `page=${++page}&query=${query}`;
});

window.addEventListener("hashchange", async () => {
	const newHash = window.location.hash;

	if (prevHash === newHash) return;

	if (newHash === "#history")
		dom.listContainer.innerHTML = dom.convertTrackSetToHTML(trackHistory);
	else {
		const json = await getJSON(newHash.substring(1));
		list.loadTrackList(json, append);
	}

	prevHash = newHash;
});

dom.seekbar.addEventListener("input", player.setPlaybackPosition);

dom.audio.addEventListener("timeupdate", () => {
	player.updateElapsedTrackTimeDisplay();
	player.updateSeekbarDisplay();
});

dom.listContainer.addEventListener("click", (e) => {
	const target = e.target as HTMLDivElement;
	const isTrack = target?.classList.contains("track-card");
	currentTrackDiv = isTrack
		? target
		: (target.closest(".track-card") as HTMLDivElement);

	playNewTrack(currentTrackDiv);
});

dom.audio.addEventListener("ended", () => {
	currentTrackDiv = currentTrackDiv.nextElementSibling as HTMLDivElement;
	playNewTrack(currentTrackDiv);
});

dom.playState.addEventListener("click", () => {
	const state = dom.audio.paused;
	player.updatePlaybackState(state);
	player.updatePauseBtn(state);
});

dom.btnHistory.addEventListener("click", () => {
	window.location.hash = "history";
});

const playNewTrack = (trackElem: HTMLDivElement) => {
	trackHistory.add(trackElem);
	list.playTrack(trackElem);
	player.updatePauseBtn(true);
	const updatedTrackInfo = dom.updateNowPlaying(trackElem);

	if(updatedTrackInfo)
		dom.trackElement.innerHTML = updatedTrackInfo;
};
