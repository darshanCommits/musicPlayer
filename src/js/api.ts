import * as util from "./utils";
import { JsonResponse, TrackMetaData } from "./sharedTypes";

export const api = {
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
			throw new Error("Failed to fetch");
		}
	},

	getMetaData: (track): TrackMetaData => {
		const { name, album, year, duration, primaryArtists, image, downloadUrl } =
			track;
		const { link: imageLink } = image[1];
		// yet to add selector from DOM
		const { link: downloadUrlLink } = downloadUrl[2];

		return {
			album: util.textAbstract(album.name, 20),
			artists: util.textAbstract(primaryArtists, 30),
			name: util.textAbstract(name, 25),
			year,
			duration,
			image: imageLink,
			downloadUrl: downloadUrlLink,
		};
	},

	getSearcResult: async (searchQuery = "atif aslam") => {
		const result = await api.getJSON(searchQuery);
		const json: JsonResponse[] = await result.data.results;
		const data: TrackMetaData[] = json
			.map((track) =>
				api.getMetaData(track));

		return data;
	},
};
