import express from 'express'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
config()
import mongoose from 'mongoose'

import authRoutes from './api/auth'

const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
  next()
})

app.use('/api', authRoutes)

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(8080)
})