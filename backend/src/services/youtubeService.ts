import * as yt from 'youtube-search-without-api-key'

export const searchYoutubeVideos = async (
    searchTerm: string,
    results: number
) => {
    const videos = await yt.search(searchTerm)
    return videos.slice(0, results)
}
