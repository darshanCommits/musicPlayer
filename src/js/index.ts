import "normalize.css";
import "../css/styles.css";
import * as list from "./events/list";
import * as player from "./events/player";
import * as dom from "./dom";
import { getJSON } from "./api";
import { getPageParameter, setPageParameter, updatePageParameter } from "./utils";

// initial page load
const initialSearchQuery = "kk";
const initialPage = 1;
const initialHash = `${initialSearchQuery}?page=${initialPage}`;
let prevHash = initialHash;

(async () => {
	window.location.hash = prevHash;
})();

dom.search.addEventListener("click", async (e) => {
	e.preventDefault();
	const newHash = dom.input.value;
	if (newHash === prevHash) return;

	window.location.hash = newHash;
});

dom.loadMore.addEventListener("click", async () => {
	const currentPage = getPageParameter(prevHash);
  const nextPage = currentPage + 1;
  const newHash = updatePageParameter(prevHash, nextPage);	
  setPageParameter(newHash, currentPage);
});

window.addEventListener("hashchange", async () => {
	const newHash = window.location.hash;
  const currentPage = getPageParameter(newHash); // Extract the page parameter

	if (newHash === prevHash) return;

	const query = await getJSON(newHash.substring(1));
	list.loadTrackList(query);

  setPageParameter(newHash, currentPage);

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

