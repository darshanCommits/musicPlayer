import "normalize.css";
import "../css/styles.css";
// import { TrackMetaData } from "./sharedTypes";
import * as events from "./events";
import * as dom from "./dom";
import { getSearchResult } from "./api";

let currentTrackList = await getSearchResult("kk");
events.list.createList(currentTrackList);

dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	const inputQuery = dom.input.value;
	const trackList = await getSearchResult(inputQuery);
	events.list.createList(trackList);
});

dom.playState.addEventListener("click", () => {
	const state = dom.audio.paused;
	events.player.updatePlayState(state);
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

	events.list.play(track);
	dom.updatePauseBtn(true)
});
