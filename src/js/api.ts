import * as util from "./utils";
import { JsonResponse, TrackMetaData } from "./sharedTypes";

export const api = {
	getJSON: async (query: string): Promise<JsonResponse> => {
		// limits the search to 5 entries, no next support for now
		const apiEndpoint =
			"https://jiosaavn-api-privatecvc2.vercel.app/search/songs?limit=5&query=";
		const apiURL = apiEndpoint + query;

		try {
			const result = await fetch(apiURL, { mode: "cors" });

			if (!result.ok)
      throw new Error(`Network response: ${result.status} - ${result.statusText}`);

			return result.json();
		} catch (error) {
	    console.error("Error fetching data:", error);
	    throw new Error("Failed to fetch data.");		
		}
	},

	getMetaData: (track: TrackMetaData): TrackMetaData => {
		const {
			name,
			primaryArtists,
			album,
			year,
			duration,
			image,
			downloadUrl,
		} = track;
	  const albumName = typeof album === 'object' ? album.name : album;

		return {
			album : util.textAbstract(albumName || '', 20),
			primaryArtists: util.textAbstract(primaryArtists || "", 30),
			name: util.textAbstract(name || "", 25),
			year: year || 0,
			duration: duration || 0,
			image: image[1]?.link || '',
			downloadUrl:  downloadUrl[2]?.link || '',
		};
	},

	getSearcResult: async (searchQuery = "altaf raja"): Promise<TrackMetaData[]> => {
		const result: JsonResponse= await api.getJSON(searchQuery);
		const json: TrackMetaData[]  = result.data.results;
		const data: TrackMetaData[] = json
			.map(track =>
				 api.getMetaData(track));

		return data;
	},
};
