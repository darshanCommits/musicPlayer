import "normalize.css";
import "../css/styles.css";
// import { TrackMetaData } from "./sharedTypes";
import * as events from "./events";
import * as dom from "./dom";
import { getJSON } from "./api";

// initial page load
let prevHash = "kk";
const query = await getJSON(prevHash);
events.search.performSearch(query);

dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	const input = dom.input.value;
	const query = await getJSON(input);
	events.search.performSearch(query);
	events.search.updateHash(input);
});

dom.loadMore.addEventListener("click", async () => {
	const query = await getJSON(prevHash);
	events.search.performSearch(query);
});

window.addEventListener("hashchange", async () => {
	const newHash = window.location.hash;

	if (newHash !== prevHash) {
		const inputQuery = await getJSON(newHash.substring(1));
		events.search.performSearch(inputQuery);

		prevHash = newHash;
	}
});

dom.playState.addEventListener("click", () => {
	const state = dom.audio.paused;
	events.player.updatePlaybackState(state);
	dom.updatePauseBtn(state);
});

dom.seekbar.addEventListener("input", () => dom.setPlaybackPosition());

dom.audio.addEventListener("timeupdate", () => {
	events.player.updateElapsedTrackTimeDisplay();
	events.player.updateSeekbarDisplay();
});

dom.listContainer.addEventListener("click", (e) => {
	const target = e.target as HTMLDivElement;
	const isTrack = target?.classList.contains("list-item");
	const track = isTrack
		? target
		: (target.closest(".list-item") as HTMLDivElement);

	events.list.playTrack(track);
	dom.updatePauseBtn(true);
});
