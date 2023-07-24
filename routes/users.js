import express from 'express'

const router = express.Router()

// Services
import auth from '../services/auth'

// Read my profile information
router.get('/:uid/profile', (req, res) => {
    
})

router.get('/:uid/wallets', (req, res) => {
    
})



// Get Auth Token
router.post('/login', async (req, res) => {
    try {    
        const token = await auth.login(
            req.body.username,
            req.body.password
        )
        if (token) {
            res.status(200)
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