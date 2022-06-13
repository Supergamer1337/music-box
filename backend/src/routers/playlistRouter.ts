import { Router } from 'express'
import { validGuildPermissions } from './../services/validationService.js'

const playlistRouter = Router()

playlistRouter.post('/create', async (req, res) => {
    const { id: userId } = req.user
    const { name, guildId } = req.body

    // Check if name and guildId were provided
    if (!name || !guildId)
        return res.status(400).json({
            error: 'Missing name and guildId fields.'
        })

    // Check that name and guildId are valid strings
    if (typeof name !== 'string' || typeof guildId !== 'string')
        return res.status(400).json({
            error: 'Name and guildId must be strings.'
        })

    try {
        // Check that the user has the correct rights for the guild
        if (
            !(await validGuildPermissions(
                // @ts-ignore
                req.session.discordTokenData.access_token,
                guildId
            ))
        )
            return res.status(403).json({
                error: 'You do not have the correct rights for this guild.'
            })

        res.status(200).json({ message: 'Created playlist' })
    } catch (error) {}
})

export default playlistRouter
