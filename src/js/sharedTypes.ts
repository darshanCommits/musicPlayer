/** Represents information about an album. */
interface Album {
	name: string;
	url: string;
}

/** Represents information about album art. */
interface AlbumArt {
	link: string;
}

/** Represents a download URL. */
interface DownloadUrl {
	link: string;
}

/** Represents metadata for a track. */
export interface TrackMetaData {
	id: string;
	name: string;
	album: Album | string;
	year: number;
	duration: number;
	primaryArtists: string;
	image: AlbumArt[] | AlbumArt | string;
	downloadUrl: DownloadUrl[] | DownloadUrl | string;
}
