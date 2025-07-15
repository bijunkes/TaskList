import express from 'express'
import cors from 'cors'
import conectarDB from './database/db.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import { autenticarToken } from './auth.js'

const app = express()
app.use(cors())
app.use(express.json())

let db

app.use('/auth', userRoutes)
app.use('/tasks', autenticarToken, taskRoutes)

app.listen(3000, async () => {
    db = await conectarDB()
    console.log('Servidor rodando em http://localhost:3000');
})
