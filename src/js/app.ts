import "normalize.css";
import "../css/styles.css";
import { TrackMetaData } from "./sharedTypes";
import { api } from "./api";
import {
	events,
	dom,
	audio,
	btn,
	seekbar,
	listContainer,
	trackList,
} from "./dom";

const arr = listContainer.children;

const bruh: TrackMetaData[] = await api.getSearcResult();
const list = dom.getList(bruh);
trackList.innerHTML = list;

btn.addEventListener("click", () => {
	audio.paused ? audio.play() : audio.pause();
});

seekbar.addEventListener("input", () => dom.setPlaybackPosition());

audio.addEventListener("timeupdate", () => {
	events.player.updateElapsedTrackTimeDisplay();
	events.player.updateSeekbarDisplay();
});

for (const item of arr) {
	item.addEventListener("click", () => events.list.play(item));
}
