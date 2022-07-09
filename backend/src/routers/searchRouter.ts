import { Router } from 'express'
import { searchForYoutubeVideos } from '../services/youtube.js'
import { validateRequest } from 'zod-express-middleware'
import { z } from 'zod'
import { handleEndpointError } from './../services/request.js'

const searchRouter = Router()

/**
 * Search for videos on youtube. Optional query parameters:
 * - nrResults: The number of results to return.
 */
searchRouter.get(
    '/yt',
    validateRequest({
        query: z.object({
            query: z.string(),
            nrResults: z.string().regex(/^\d+$/).optional()
        })
    }),
    async (req, res) => {
        try {
            const query = req.query.query

            let nrResults = 3
            if (req.query.nrResults) {
                // Has been checked by zod to be a number
                const parsedNrResults = parseInt(req.query.nrResults)
                if (parsedNrResults > 0) {
                    nrResults = parsedNrResults
                }
            }

            const videos = await searchForYoutubeVideos(query, nrResults)

            res.status(200).json({ videos })
        } catch (error) {
            handleEndpointError(
                error,
                res,
                'Something went wrong while searching for videos.'
            )
        }
    }
)

export default searchRouter
