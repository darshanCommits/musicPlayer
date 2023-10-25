import * as util from "./utils";
import { JsonResponse, TrackMetaData } from "./sharedTypes";
import { listContainer } from "./dom";

// limits the search to 5 entries, no next support for now
const API_ENDPOINT =
	"https://jiosaavn-api-privatecvc2.vercel.app/search/songs?";

/**
 * Fetch JSON data from the music search API.
 *
 * @param query - The search query.
 * @returns A Promise that resolves to a JSON response.
 * @throws An error if the network request fails.
 */

export const getJSON = async (params: string): Promise<JsonResponse> => {
	const apiURL = API_ENDPOINT + params;
	console.log(apiURL)

	try {
		const result = await fetch(apiURL, { mode: "cors" });

		if (!result.ok) {
			throw new Error(`Network response: ${result.status} - ${result.statusText}`);
		}
		return result.json();
	} catch (error) {
		listContainer.innerText = "TF JUST HAPPENED NO IDEA MATE!! probably the api is down or some shit??";
		console.error("Error fetching data:", error);
		throw new Error("Failed to fetch data.");
	}
};

/**
 * Get metadata for a track.
 *
 * @param track - The track metadata.
 * @returns Transformed track metadata.
 */

export const getMetaData = (track: TrackMetaData): TrackMetaData => {
	const { name, primaryArtists, album, year, duration, image, downloadUrl, id } =
		track;
	const albumName = typeof album === "object" ? album.name : album;

	return {
		id,
		album: util.textAbstract(albumName || "", 20),
		primaryArtists: util.textAbstract(primaryArtists || "", 35),
		name: util.textAbstract(name || "", 25),
		year: year || 0,
		duration: duration || 0,
		image: image[1]?.link || "",
		downloadUrl: downloadUrl[2]?.link || "",
	};
};

/**
 * Transform the resulted JSON to usable MetaData.
 *
 * @param result - The json response.
 * @returns A Promise that resolves to an array of track metadata.
 */

export const fetchSearchResult = (result: JsonResponse) => {
	const json: TrackMetaData[] = result.data.results;
	const data: TrackMetaData[] = json.map((track) => getMetaData(track));

	return data;
};
