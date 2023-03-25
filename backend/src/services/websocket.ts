import type { Request, Response } from 'express'
import e, { Express, NextFunction } from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { playPlaylist } from './musicBot.js'
import { validGuildPermissions } from './validation.js'

let websocket: Server
const SESSION_RELOAD_INTERVAL = 30 * 1000

export class WebsocketError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'WebsocketError'
    }
}

export const disconnectSessionWebsockets = (sessionId: string) => {
    websocket.to(sessionId).disconnectSockets(true)
}

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
        try {
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

            socket.on('post-guild', async (guildId: string) => {
                if (
                    !(await validGuildPermissions(
                        socket.request.session.discordTokenData.access_token,
                        guildId
                    ))
                )
                    socket.conn.close()

                if (socket.data.guildId) socket.leave(socket.data.guildId)
                socket.data.guildId = guildId
                socket.join(guildId)
            })

            socket.on('play-playlist', async (playlistId: string) => {
                playPlaylist(playlistId, socket.data.guildId)
            })

            socket.emit('get-guild')
        } catch (error) {
            if (error instanceof WebsocketError) {
                socket.emit('error', error.message)
            } else {
                socket.emit('error', 'Internal server error occurred.')
            }
        }
    })
}
