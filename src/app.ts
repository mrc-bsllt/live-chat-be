import express from 'express'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
config()
import mongoose from 'mongoose'

import authRoutes from './api/auth'

const app = express()
app.use(bodyParser.json())

app.use('/api', authRoutes)

mongoose.connect(process.env.MONGODB_URI!).then(() => {
  app.listen(8080)
})