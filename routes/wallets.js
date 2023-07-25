import express from 'express'

import walletSrv from '../services/wallet'

const router = express.Router()

/* POST new Wallet */
router.post('/', async (req, res) => {
    // TODO Implement POST new Wallet
})

/* GET Wallet Transactions */
router.get('/:id/transactions/:perPage/:pageNum', async (req, res) => {
    // TODO Implement GET Wallet Transactions
})

/* POST new Wallet Transaction */
router.get('/:id/transactions', async (req, res) => {
    // TODO Implement POST new Wallet Transaction
})

// TODO: Remove this route
/* GET Wallet */
// router.get('/:id', async (req, res) => {
//     try {
//         const wallet = await walletSrv.getWallet(req.params.id, req.header('Authorization'))
//         if (wallet) {
//             res.status(200) // Ok
//             res.send(wallet)
//         }
//         else {
//             throw new Error('Something went wrong :(')
//         }
//     }
//     catch (e) {
//         console.log(e)
//         res.status(400) // Bad request
//         res.send({})
//     }
// })

export default router