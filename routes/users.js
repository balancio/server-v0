import express from 'express'

const router = express.Router()

// Services
import authSrv from '../services/auth'
import userSrv from '../services/user'
import walletSrv from '../services/wallet'

/* POST new User (Register) */
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

/* GET User Auth Token (Login) */
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

/* GET User (Profile Data) */
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

/* GET User Wallets */
router.get('/:username/wallets', (req, res) => {
    // TODO
})





export default router