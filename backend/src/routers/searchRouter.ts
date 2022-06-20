import { Router } from 'express'
import { searchForYoutubeVideos } from '../services/youtube.js'

const searchRouter = Router()

/**
 * Search for videos on youtube. Optional query parameters:
 * - nrResults: The number of results to return.
 */
searchRouter.get('/yt', async (req, res) => {
    const query = req.query.query as string | undefined

    if (!query)
        return res.status(400).json({ error: 'Missing query parameter.' })

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

        const videos = await searchForYoutubeVideos(query, nrResults)

        res.status(200).json({ videos })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            error: 'Something went retrieving youtube videos'
        })
    }
})

export default searchRouter
