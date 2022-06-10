import { Router } from 'express'
import { searchYoutubeVideos } from './../services/youtubeService.js'

const searchRouter = Router()

searchRouter.get('/yt/:searchTerm', async (req, res) => {
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
    const videos = await searchYoutubeVideos(searchTerm, nrResults)

    res.status(200).json({ videos })
})

export default searchRouter
