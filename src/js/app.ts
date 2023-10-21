import "normalize.css";
import "../css/styles.css";
// import { TrackMetaData } from "./sharedTypes";
import * as events from "./events";
import * as dom from "./dom";
// import { getSearchResult } from "./api";

// initial page load
events.search.performSearch("kk");

dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	const inputQuery = dom.input.value;
	events.search.performSearch(inputQuery);
	events.search.updateHash(inputQuery);
});

window.addEventListener("hashchange" , async () => {
	const inputQuery = window.location.hash.substring(1);
	events.search.performSearch(inputQuery);
})

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
	const track = isTrack ? target : target.closest(".list-item") as HTMLDivElement;

	events.list.playTrack(track);
	dom.updatePauseBtn(true)
});
