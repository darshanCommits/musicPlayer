import { fetchSearchResult } from "../api";
import { JsonResponse } from "../sharedTypes";
import { createTrackList } from "./list";

/**
 * Update the URL hash with a search query.
 * @param query - The search query.
 */
export const updateHash = (query: string) => {
	window.location.hash = query;
};

/**
 * Perform a music search based on the given query.
 * @param json - The search query.
 */
export const performSearch = async (json: JsonResponse) => {
	const trackList = await fetchSearchResult(json);
	createTrackList(trackList);
};
