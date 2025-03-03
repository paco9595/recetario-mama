import express from 'express'
import cors  from 'cors'
import path from 'node:path'

import authRouter from './auth'
import recipesRouter from './recipes';


const app = express()

app.use(cors())
app.use(express.json())


app.use('/api/auth', authRouter)
app.use('/api/recipes', recipesRouter)
app.use('/api/static', express.static(path.join(__dirname, 'public')))



export default app