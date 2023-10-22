import "normalize.css";
import "../css/styles.css";
import * as list from "./events/list"
import * as player from "./events/player"
import * as search from "./events/search"
import * as dom from "./dom";
import { getJSON } from "./api";

// initial page load
let prevHash = "kk";
const query = await getJSON(prevHash);
search.performSearch(query);

dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	const input = dom.input.value;
	const query = await getJSON(input);
	search.performSearch(query);
	search.updateHash(input);
});

window.addEventListener("hashchange", async () => {
	const newHash = window.location.hash;

	if (newHash !== prevHash) {
		const inputQuery = await getJSON(newHash.substring(1));
		search.performSearch(inputQuery);

		prevHash = newHash;
	}
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
	const track = isTrack
		? target
		: (target.closest(".list-item") as HTMLDivElement);

	list.playTrack(track);
	player.updatePauseBtn(true);
});
