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
    async newWalletTran(username, auth_token) {
        auth_token = await token.parse(auth_token.replace('Bearer ', ''))
        // console.log(auth_token)
        if (auth_token) {
            return await database.run(
                async (db) => {
                    // console.log(id)
                    const user = await db.collection('users').findOne({ username })
                    if (user._id != auth_token.payload.sub)
                        return null
                    const wallets = await db.collection('wallets').find(
                        { _id: { $in: user.wallet_ids.map((val) => new ObjectId(val)) } }
                    ).toArray()
                    return wallets
                },
                () => null
            )
        }
        return null
    }
}

export default tranSrv