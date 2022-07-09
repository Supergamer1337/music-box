import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function useWebsocket() {
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        if (!socket) {
            const newSocket = io(process.env.BACKEND_ADDRESS)
            setSocket(newSocket)
        }
    }, [socket])
}
