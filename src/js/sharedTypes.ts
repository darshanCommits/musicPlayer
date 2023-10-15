export interface JsonResponse {
	data: {
		results: TrackMetaData[];
		// Other properties go here
	};
}

interface AlbumArt {
	link: string;
	// Add other properties as needed
}

interface DownloadUrl {
	link: string;
	// Add other properties as needed
}

export interface TrackMetaData {
	name: string;
	album: string;
	year: number;
	duration: number;
	artists: string;
	image: AlbumArt[];
	downloadUrl: DownloadUrl[];
}
