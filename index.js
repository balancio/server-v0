import { config as envConfig } from 'dotenv'
import express from 'express'

envConfig()

// --- Service Imports ---

import auth from './services/auth'

// --- Route Imports ---

import walletsRouter from './routes/wallets'
import usersRouter from './routes/users'

// --- Express Server ---

const app = express()

app.use(express.json())

// Check Token Validity
app.use((req, res, next) => {
    console.log('[Middleware] Check token validity')
    const token = req.header('Authorization')
    if(auth.token.validate(token)) { 
        console.log('> Token is valid!')
        next()
    }
    else { 
        console.log('> Token is NOT valid.')
        res.send(401) // Unauthorized
    } 
})

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