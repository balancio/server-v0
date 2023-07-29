import { config as envConfig } from 'dotenv'
import express from 'express'
import cors from 'cors'

envConfig()

// --- Service Imports ---

import auth from './services/auth'

// --- Route Imports ---

import walletsRouter from './routes/wallets'
import usersRouter from './routes/users'

// --- Express Server ---

const app = express()

app.use(express.json())
app.use(cors({
    origin: '*', exposedHeaders: ['Authorization']
}))

app.use('/wallets', walletsRouter)
app.use('/users', usersRouter)

// Start Listening

app.listen(
    Number(process.env.SRV_PORT), 
    process.env.SRV_HOST, 
    async () => {
        // Debug Info
        console.log(`Listening on port ${process.env.SRV_PORT}`)
    }
)