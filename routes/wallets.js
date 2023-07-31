import express from 'express'

import walletSrv from '../services/wallet'
import transSrv from '../services/transaction'
import { checkToken } from '../middlewares'

const router = express.Router()

/* POST new Wallet */
router.post('/', checkToken, async (req, res) => {
    try {
        const wallet = await walletSrv.newWallet(
            req.header('Authorization'), 
            req.body
        )
        if (wallet) {
            res.status(201) // Created
        }
        else {
            throw new Error('Something went wrong :(')
        }
    }
    catch (e) {
        console.log(e)
        res.status(400) // Bad request
    }
    res.send()
})

/* GET Wallet Transactions */
router.get('/:id/transactions', checkToken, async (req, res) => {
    try {
        const trans = await transSrv.getWalletTrans(req.params.id, req.header('Authorization'))
        if (trans) {
            res.status(200) // Ok
            res.send(trans)
        }
        else {
            throw new Error('Something went wrong :(')
        }
    }
    catch (e) {
        console.log(e)
        res.status(400) // Bad request
        res.send()
    }
})

/* POST new Wallet Transaction */
router.post('/:id/transactions', checkToken, async (req, res) => {
    try {
        const trans = await transSrv.newWalletTran(
            req.params.id, 
            req.header('Authorization'), 
            req.body
        )
        if (trans) {
            res.status(201) // Created
        }
        else {
            throw new Error('Something went wrong :(')
        }
    }
    catch (e) {
        console.log(e)
        res.status(400) // Bad request
    }
    res.send()
})

/* GET Wallet */
router.get('/:id', checkToken, async (req, res) => {
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

/* DELETE Wallet */
router.delete('/:id', checkToken, async (req, res) => {
    try {
        const wallet = await walletSrv.deleteWallet(req.params.id, req.header('Authorization'))
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