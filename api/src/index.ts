import { startHandler, errorHandler } from './components/handlers'
import { employeeRoute } from './components/routes'
import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()
const { PORT } = process.env

const app = express()

// middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(errorHandler)

// routes
app.use('/employee', employeeRoute)

app.listen(PORT, startHandler)
