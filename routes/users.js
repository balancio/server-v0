import express from 'express'

const router = express.Router()

// Services
import authSrv from '../services/auth'
import userSrv from '../services/user'

// Create new user profile
router.post('/', async (req, res) => {
    try {
        const ok = await userSrv.newUser(
            req.body.username,
            req.body.password,
            req.body.password_confirm
        )
        if (ok) {
            res.status(201) // Created
        }
        else {
            throw new Error('Something went wrong.')
        }
    }
    catch (e) {
        console.log(e)
        res.status(400) // Bad request
    }
    res.send()
})

// Read user profile info
router.get('/:username', async (req, res) => {
    try {
        const user = await userSrv.getUser(req.params.username, req.header('Authorization'))
        if (user) {
            res.status(200) // Ok
        }
        else {
            throw new Error('Something went wrong.')
        }
        res.send(user)
    }
    catch (e) {
        console.log(e)
        res.status(400) // Bad request
        res.send({})
    }
})

router.get('/:username/wallets', (req, res) => {
    
})



// Get Auth Token
router.post('/login', async (req, res) => {
    try {    
        const token = await authSrv.login(
            req.body.username,
            req.body.password
        )
        if (token) {
            res.status(200) // Ok
            res.header('Authorization', `Bearer ${token}`)
        }
        else {
            throw new Error('Bad login credentials.')
        }
    }
    catch (e) {
        console.log(e)
        res.status(400) // Bad request
    }
    res.send()
})

export default router