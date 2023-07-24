import express from 'express'

import walletSrv from '../services/wallet'

const router = express.Router()

router.post('/', async (req, res) => {
    
})

router.get('/:id', async (req, res) => {
    try {
        const wallet = await walletSrv.getWallet(req.params.id, req.header('Authorization'))
        if (wallet) {
            res.status(200) // Ok
            res.send(wallet)
        }
        else {
            throw new Error('Something went wrong :(')
        }
    }
    catch (e) {
        console.log(e)
        res.status(400) // Bad request
        res.send({})
    }
})

export default router