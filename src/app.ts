import express from 'express'
import path from 'path'
import { config } from 'dotenv'
config()
import mongoose from 'mongoose'
import type { RequestMod } from './types/auth'

import multer from 'multer'
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/storage/images')
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

const app = express()
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
  next()
})
app.use(multer({ storage: fileStorage, fileFilter }).single('image_path'))
app.use('/src/storage/images', express.static(path.join(__dirname, 'storage/images')))

app.use('/api', authRoutes)
app.use('/api', userRoutes)

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(8080)
})