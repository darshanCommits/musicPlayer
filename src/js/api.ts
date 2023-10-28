import * as util from "./utils";
import { TrackMetaData } from "./sharedTypes";
import { listContainer } from "./dom";

const API_ENDPOINT = "https://jiosaavn-api-privatecvc2.vercel.app/search/songs?";

/**
 * Fetch JSON data from the music search API.
 *
 * @param query - The search query.
 * @returns A Promise that resolves to a JSON response.
 * @throws An error if the network request fails.
 */

export const getJSON = async (params: string): Promise<TrackMetaData[]> => {
	const apiURL = API_ENDPOINT + params;

	try {
		const result = await fetch(apiURL, { mode: "cors" });

		if (!result.ok) throw new Error(`Network response: ${result.status} - ${result.statusText}`);

		return result.json().then(json => json.data.results);
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
	const { name, primaryArtists, album, year, duration, image, downloadUrl, id } = track;
	const albumName = typeof album === "object" ? album.name : album;

	return {
		id,
		album: util.textAbstract(albumName || "", 20),
		primaryArtists: util.textAbstract(primaryArtists || "", 30),
		name: util.textAbstract(name || "", 25),
		year: year || 0,
		duration: duration || 0,
		image: image[1]?.link || "",
		downloadUrl: downloadUrl[2]?.link || ""
	};
};
