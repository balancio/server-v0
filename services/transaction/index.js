import { ObjectId } from 'mongodb'
import database from '../../database'
import token from '../auth/_token'


const tranSrv = {
    async getWalletTrans(wid, auth_token) {
        auth_token = await token.parse(auth_token.replace('Bearer ', ''))
        // console.log(auth_token)
        if (auth_token) {
            return await database.run(
                async (db) => {
                    const uid = auth_token.payload.sub

                    const wallet = await db.collection('wallets').findOne({ 
                        _id: new ObjectId(wid), user_ids: { $all: [uid] } 
                    })

                    if (wallet == null)
                        return null

                    const trans = await db.collection('transactions').find({ 
                        wallet_id: wid
                    }).toArray()

                    return trans
                },
                () => null
            )
        }
        return null
    },
    async newWalletTran(wid, auth_token, newTranData) {
        auth_token = await token.parse(auth_token.replace('Bearer ', ''))
        // console.log(auth_token)
        if (auth_token) {
            return await database.run(
                async (db) => {
                    const uid = auth_token.payload.sub

                    const filter = { 
                        _id: new ObjectId(wid), 
                        user_ids: { $all: [uid] } 
                    }

                    const wallet = await db.collection('wallets').findOne(filter)

                    if (wallet == null)
                        return null

                    newTranData.wallet_id = wid
                    await db.collection('transactions').insertOne(newTranData).then((res) => {
                        db.collection('wallets').updateOne(filter, { 
                            $set: { total: wallet.total + newTranData.amount }
                        })
                    })

                    return true
                },
                () => false
            )
        }
        return false
    }
}

export default tranSrv