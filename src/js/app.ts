import "normalize.css";
import "../css/styles.css";
import * as list from "./events/list";
import * as player from "./events/player";
import * as dom from "./dom";
import { getJSON } from "./api";

let page = 1;
let append = false; // handles whether need to load more results or create new entry
let prevHash = "";
let currentTrackDiv: HTMLDivElement;
const trackHistory: Set<HTMLDivElement> = new Set();

(async () => {
	const initialHash = `page=${page}&query=english`;
	const json = await getJSON(initialHash);
	list.loadTrackList(json);

	window.location.hash = initialHash;
})();

dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	page = 1;
	append = false;
	const newHash = `page=${page}&query=${dom.input.value}`;

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
		dom.listContainer.innerHTML = dom.convertSetToHtml(trackHistory);
	else {
		const json = await getJSON(newHash.substring(1));
		list.loadTrackList(json, append);
	}

	prevHash = newHash;
});

dom.playState.addEventListener("click", () => {
	const state = dom.audio.paused;
	player.updatePlaybackState(state);
	player.updatePauseBtn(state);
});

dom.seekbar.addEventListener("input", player.setPlaybackPosition);

dom.audio.addEventListener("timeupdate", () => {
	player.updateElapsedTrackTimeDisplay();
	player.updateSeekbarDisplay();
});

dom.listContainer.addEventListener("click", (e) => {
	const target = e.target as HTMLDivElement;
	const isTrack = target?.classList.contains("list-item");
	currentTrackDiv = isTrack
		? target
		: (target.closest(".list-item") as HTMLDivElement);

	trackHistory.add(currentTrackDiv);
	list.playTrack(currentTrackDiv);
	console.log(trackHistory);
	player.updatePauseBtn(true);
});

dom.audio.addEventListener("ended", () => {
	const current = currentTrackDiv.getAttribute("data-index");
	if (current === null) return;

	const next = parseInt(current) + 1;
	console.log(next);
});

dom.btnHistory.addEventListener("click", () => {
	window.location.hash = "history";
});
