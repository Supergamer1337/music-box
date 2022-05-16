import { Router } from 'express'

const playbackRouter = Router()

playbackRouter.get('/', (_, res) => {
    res.status(200).json({
        message: 'Playback router is working!'
    })
})

playbackRouter.post('/', (req, res) => {
    const { body } = req
    const { message } = body

    res.status(200).json({
        echo: message
    })
})

export default playbackRouter
