import { Server } from "socket.io"
let io: any

export const init = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  })

  return io
}

export const getIO = () => {
  return io
}