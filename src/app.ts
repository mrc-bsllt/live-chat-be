import express from 'express'
import path from 'path'
import { config } from 'dotenv'
config()
import mongoose from 'mongoose'
import type { RequestMod } from './types/auth'
import { seed_users } from './seeder/users'
// import { Server } from "socket.io"
import { init } from './socket'

import multer from 'multer'
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'dist/storage/images')
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() +  '-' + file.originalname)
  }
}) 
const fileFilter = (req: RequestMod, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp') {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

import authRoutes from './api/auth'
import userRoutes from './api/user'
import friendRoutes from './api/friend'

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
  next()
})
app.use(multer({ storage: fileStorage, fileFilter }).single('image_path'))
app.use('/dist/storage/images', express.static(path.join(__dirname, 'storage/images')))

app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', friendRoutes)

// SEEDER
// seed_users()

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  const server = app.listen(8080)
  const io = init(server)
  // const io = new Server(server, {
  //   cors: {
  //     origin: "http://localhost:3000",
  //     methods: ["GET", "POST"]
  //   }
  // })

  // @ts-ignore
  io.on('connection', socket => {
    console.log('Client connected!')
  })
})