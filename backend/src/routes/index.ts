import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'

import recipesRouter from './recipes';
import { clerkMiddleware, requireAuth } from '@clerk/express';


const app = express()

app.use(cors())
app.use(express.json())

app.use(clerkMiddleware())

app.use('/api/recipes',requireAuth(), recipesRouter)
app.use('/api/static', express.static(path.join(__dirname, 'public')))

//app.use(errorHandler)

export default app