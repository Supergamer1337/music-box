/**
 * Interface for playlist information, without songs or other optional fields.
 */
export interface PlaylistInfo {
    id: string
    name: string
    thumbnail?: string
}

/**
 * Interface for the full playlist object.
 */
export interface Playlist extends PlaylistInfo {
    songs: any
}
