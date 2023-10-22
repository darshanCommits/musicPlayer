import "normalize.css";
import "../css/styles.css";
import * as list from "./events/list";
import * as player from "./events/player";
import * as dom from "./dom";
import { getJSON } from "./api";


// initial page load
let page = 1;
let prevHash = "kk";

(async () => {
  const query = await getJSON(prevHash, page);
  list.loadTrackList(query);
})();


dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	const newHash = dom.input.value;
	if (newHash === prevHash)	return;

	page = 1; // reset the page value
	window.location.hash = newHash;
});

dom.loadMore.addEventListener("click", async () => {
	const query = await getJSON(prevHash, ++page);
	list.loadTrackList(query, true);
});

window.addEventListener("hashchange", async () => {
	const newHash = window.location.hash;
	if (newHash === prevHash)	return;

	const query = await getJSON(newHash.substring(1));

	list.loadTrackList(query);
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
	const track = isTrack
		? target
		: (target.closest(".list-item") as HTMLDivElement);

	list.playTrack(track);
	player.updatePauseBtn(true);
});
