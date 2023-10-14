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

	getMusicComponent: (json) => {
		/** TYPE TRACK : chatGPT*/
		return json.data.results
			.map((track) =>
				api.getMetaData(track));
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

console.log(bruh());
