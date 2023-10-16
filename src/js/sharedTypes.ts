export interface JsonResponse {
	status: string;
	data: {
		results: TrackMetaData[];
		// Other properties go here
	};
}

interface Album {
  name: string;
  url: string;
}

interface AlbumArt {
	link: string;
}

interface DownloadUrl {
	link: string;
}

export interface TrackMetaData {
	name: string;
	album: Album | string;
	year: number;
	duration: number;
	primaryArtists: string;
	image: AlbumArt[] | AlbumArt;
	downloadUrl: DownloadUrl[] | DownloadUrl;
}
