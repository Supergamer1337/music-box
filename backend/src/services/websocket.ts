import e, { Express, NextFunction } from 'express'
import type { Response, Request } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { validGuildPermissions } from './validation.js'

export let websocket: Server
const SESSION_RELOAD_INTERVAL = 30 * 1000

/**
 * Setup the websocket.
 *
 * @param app The express app.
 * @param sessionMiddleware The session middleware.
 */
export const setupWebsocket = (
    app: Express,
    sessionMiddleware: e.RequestHandler
) => {
    const httpServer = createServer(app)
    const io = new Server(httpServer, {
        cors: {
            credentials: true,
            origin:
                process.env.NODE_ENV === 'development' &&
                process.env.FRONTEND_ADDRESS
        }
    })
    io.use((socket, next) =>
        sessionMiddleware(
            socket.request as Request,
            {} as Response,
            next as NextFunction
        )
    )
    websocket = io

    setupWsEvents()

    return httpServer
}

/**
 * Setup the websocket events.
 */
const setupWsEvents = () => {
    websocket.on('connection', (socket) => {
        socket.join(socket.request.session.id)

        const timer = setInterval(() => {
            socket.request.session.reload((err) => {
                if (err) {
                    socket.conn.close()
                }
            })
        }, SESSION_RELOAD_INTERVAL)

        socket.on('disconnect', () => {
            clearInterval(timer)
        })

        socket.emit('get-guild')

        socket.on('post-guild', async (guildId) => {
            if (
                !(await validGuildPermissions(
                    socket.request.session.discordTokenData.access_token,
                    guildId
                ))
            ) {
                socket.conn.close()
            }
            socket.join(guildId)

            console.log('User was added to guild', guildId)
        })
    })
}
