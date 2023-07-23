import { config as envConfig } from 'dotenv'
import express from 'express'
import auth from './services/auth'

envConfig()

// --- Setup Express Application ---

const srv = {
    PORT: Number(process.env.SRV_PORT),
    HOST: process.env.SRV_HOST,
}

console.log(srv)

const app = express()

app.post('/login', async (req, res) => {
    const token = await auth.login('ben', 'ben123')
    const ok = await auth.validate(token)
    res.status(ok ? 200 : 406)
    res.send('OK')
})

app.listen(srv.PORT, srv.HOST, async () => {
    // Debug Info
    console.log(`Listening on port ${srv.PORT}`)
})