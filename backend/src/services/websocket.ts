import e, { Express, NextFunction } from 'express'
import type { Response, Request } from 'express'
import { Server } from 'socket.io'
import { createServer } from 'http'

export let websocket: Server

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
            origin: process.env.NODE_ENV === 'development' && '*'
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

    setupEvents()

    return httpServer
}

const setupEvents = () => {
    websocket.on('connection', (socket) => {
        console.log('Client connected')
        socket.on('disconnect', () => {
            console.log('Client disconnected')
        })
    })
}
