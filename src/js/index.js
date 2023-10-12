/** api by @sumitkolhe */

function textAbstract(text, length, ellipsis = "...") {
	if (text.length <= length) return ellipsis;
	if (text.length <= length) return text;
	if (text === null) return "";

	let abstractedTest = text.substring(0, length);
	const lastWord = abstractedTest.lastIndexOf(" "); // this will check if any word was cut in between

	abstractedTest = abstractedTest.substring(0, lastWord) + ellipsis;

	return abstractedTest;
}

const api = {
	getJSON: async (query) => {
		const apiEndpoint =
			"https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=";
		const apiURL = apiEndpoint + query;

		try {
			const res = await fetch(apiURL, { mode: "cors" });
			const json = res.json();

			return json;
		} catch (error) {
			throw new Error(`Failed to fetch : ${error.message}`);
		}
	},

	// getMusicComponent: (json) => {
	// 	/** TYPE TRACK : chatGPT*/
	// 	const trackList = json.data.results;

	// 	const bruh = [];

	// 	bruh.forEach((track) => {
	// 		const relevantData = getMetaData(track);
	// 	});
	// },

	getMetaData: (track) => {
		const { name, album, year, duration, primaryArtists, image, downloadUrl } =
			track;
		const { link: imageLink } = image[1];
		const { link: downloadUrlLink } = downloadUrl[2];

		return {
			name,
			album: album.name,
			year,
			duration,
			artists: primaryArtists,
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

console.log(bruh());
