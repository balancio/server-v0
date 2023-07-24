import express from 'express'

const router = express.Router()

router.get('/:wid', (req, res) => {
    
})

router.get('', (req, res) => {
    req.params.wid
})

export default router