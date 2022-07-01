import express from 'express'
import bodyParser from 'body-parser'

import authRoutes from './routes/auth'

const app = express()
app.use(bodyParser.json())

app.use('/api', authRoutes)

app.listen(8080)