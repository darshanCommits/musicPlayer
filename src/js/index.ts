import * as util from "./utils";

function textAbstract(text: string, length: number, ellipsis = "...") {
	if (text.length <= length) return ellipsis;
	if (text.length <= length) return text;
	if (text === null) return "";

	let abstractedTest = text.substring(0, length);
	const lastWord = abstractedTest.lastIndexOf(" "); // this will check if any word was cut in between

	abstractedTest = abstractedTest.substring(0, lastWord) + ellipsis;

	return abstractedTest;
}

const api = {
	getJSON: async (query: string) => {
		// limits the search to 5 entries, no next support for now
		const apiEndpoint =
			"https://jiosaavn-api-privatecvc2.vercel.app/search/songs?limit=5&query=";
		const apiURL = apiEndpoint + query;

		try {
			const res = await fetch(apiURL, { mode: "cors" });

			if (!res.ok)
				throw new Error(`Network response : Not Okay.
	      \nTry checking typos in apiEndpoint variable.`);

			return res.json();
		} catch (error) {
			throw new Error(`Failed to fetch : ${error.message}`);
		}
	},

	getMetaData: (track) => {
		const { name, album, year, duration, primaryArtists, image, downloadUrl } =
			track;
		const { link: imageLink } = image[1];
		// yet to add selector from DOM
		const { link: downloadUrlLink } = downloadUrl[2];

		return {
			name: textAbstract(name, 25),
			album: textAbstract(album.name, 20),
			artists: textAbstract(primaryArtists, 30),
			year,
			duration,
			image: imageLink,
			downloadUrl: downloadUrlLink,
		};
	},
};

async function bruh() {
	const result = await api.getJSON("believer");
	const data = result.data.results;

	return api.getMetaData(data[0]);
}

const audio = document.querySelector("audio") as HTMLAudioElement;
const btn = document.querySelector("#play-pause") as HTMLButtonElement;

btn.addEventListener("click", () => {
	if (audio.paused) audio.play();
	else audio.pause();
});

const seekbar = document.getElementById("seekbar") as HTMLInputElement;

// Add an event listener to the seekbar for input changes
seekbar.addEventListener("input", function () {
	const seekTime = (audio.duration * parseInt(seekbar.value)) / 100;
	audio.currentTime = seekTime;
});

// Update the seekbar as the audio plays
audio.addEventListener("timeupdate", function () {
	events.player.trackDurationTracker();
	events.player.trackSeekbar();
});

const events = {
	player: {
		trackSeekbar: () => {
			const seekbarValue = (
				(audio.currentTime / audio.duration) *
				100
			).toString();
			seekbar.value = seekbarValue;
			seekbar.style.backgroundSize = `${seekbarValue}% 100%`;
		},

		trackDurationTracker: () => {
			const currentTime = audio.currentTime;
			const inMinutes = util.convertToMin(currentTime);

			const elapsedTime = document.querySelector(
				"#elapsed-time",
			) as HTMLDivElement;
			elapsedTime.innerText = inMinutes;
		},
	},
};
