import "normalize.css";
import "../css/styles.css";
import { JsonResponse, TrackMetaData } from "./sharedTypes";
import { api } from "./api";
import { events, dom, audio, btn, seekbar } from "./dom";

async function bruh() {
	const result = await api.getJSON("believer");
	const json: JsonResponse[] = await result.data.results;
	const data = json.map((track): TrackMetaData => api.getMetaData(track));
	return data;

	// document.addEventListener("DOMContentLoaded" genDom(data)
}

genDom(await bruh());

function genDom(list: TrackMetaData[]) {
	const listContainer = document.querySelector(
		"#list-container",
	) as HTMLDivElement;

	if (!listContainer) {
		console.error("DOM element not found");
		return;
	}

	const markup = list.reduce(
		(html, track) => `${html}${dom.getListItem(track)}`,
		"",
	);

	listContainer.innerHTML = markup;
}

console.log(await bruh());

btn.addEventListener("click", () => {
	if (audio.paused) audio.play();
	else audio.pause();
});

seekbar.addEventListener("input", function () {
	const seekTime = (audio.duration * parseInt(seekbar.value)) / 100;
	audio.currentTime = seekTime;
});

audio.addEventListener("timeupdate", function () {
	events.player.trackDurationTracker();
	events.player.trackSeekbar();
});
