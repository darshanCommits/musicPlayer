import "normalize.css";
import "../css/styles.css";
import { TrackMetaData } from "./sharedTypes";
import * as api from "./api";
import * as events from "./events";
import * as dom from "./dom";

const arr = dom.listContainer.children;

const bruh: TrackMetaData[] = await api.getSearcResult();
const list = dom.getList(bruh);
dom.trackList.innerHTML = list;

dom.btn.addEventListener("click", () =>
	dom.audio.paused ? dom.audio.play() : dom.audio.pause(),
);
dom.seekbar.addEventListener("input", () => dom.setPlaybackPosition());

dom.audio.addEventListener("timeupdate", () => {
	events.player.updateElapsedTrackTimeDisplay();
	events.player.updateSeekbarDisplay();
});

for (const item of arr)
	item.addEventListener("click", () => events.list.play(item));
