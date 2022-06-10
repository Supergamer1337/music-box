import { Router } from 'express'
import { searchForYoutubeVideos } from './../services/youtubeService.js'

const searchRouter = Router()

/**
 * Search for videos on youtube. Optional query parameters:
 * - nrResults: The number of results to return.
 */
searchRouter.get('/yt/:searchTerm', async (req, res) => {
    try {
        let nrResults = 3
        if (req.query.nrResults) {
            try {
                const parsedNrResults = parseInt(req.query.nrResults as string)
                if (parsedNrResults > 0) {
                    nrResults = parsedNrResults
                }
            } catch (error) {
                res.status(400).json({ error: 'Invalid nrResults parameter' })
            }
        }

        const searchTerm = req.params.searchTerm
        const videos = await searchForYoutubeVideos(searchTerm, nrResults)

        res.status(200).json({ videos })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            error: 'Something went retrieving youtube videos'
        })
    }
})

export default searchRouter
