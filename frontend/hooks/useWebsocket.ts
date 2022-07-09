import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useRouter } from 'next/router'

export default function useWebsocket() {
    const router = useRouter()
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        if (!socket) {
            const newSocket = io(process.env.BACKEND_ADDRESS as string, {
                withCredentials: true
            })
            setupEvents(newSocket, router.query.guildId as string)
            setSocket(newSocket)
        }

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, [])
}

const setupEvents = (socket: Socket, guildId: string) => {
    socket.on('get-guild', () => {
        socket.emit('post-guild', guildId)
    })
}
