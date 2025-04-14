import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'node:path'

import recipesRouter from './recipes';
import authRouter from './auth';
import { clerkMiddleware, requireAuth } from '@clerk/express';


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/static/images', express.static(path.join(__dirname,'..','..', 'static')))
app.use('/api/auth/callback', authRouter)
app.use(clerkMiddleware())
app.use('/api/recipes',requireAuth(), recipesRouter)

//app.use(errorHandler)

export default app