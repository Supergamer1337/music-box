import { Router } from 'express'
import MusicBot from '../services/MusicBot.js'

const playbackRouter = Router()

playbackRouter.get('/', (_, res) => {
    const musicBot = MusicBot.getSharedInstance()

    musicBot.playAudioInVC('718078692110237746', '585869475622944815')

    res.status(200).send('Joined voice channel!')
})

playbackRouter.post('/', (req, res) => {
    const { body } = req
    const { message } = body

    res.status(200).json({
        echo: message
    })
})

export default playbackRouter
