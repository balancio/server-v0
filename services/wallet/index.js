import { ObjectId } from 'mongodb'
import database from '../../database'
import token from '../auth/_token'


const walletSrv = {
    async getWallet(id, auth_token) {
        auth_token = await token.parse(auth_token.replace('Bearer ', ''))
        // console.log(auth_token)
        if (auth_token) {
            return await database.run(
                async (db) => {
                    // console.log(id)
                    const wallet = await db.collection('wallets').findOne({ _id: new ObjectId(id) })
                    return wallet.user_ids.includes(auth_token.payload.sub) ? wallet : null
                },
                () => null
            )
        }
        return null
    },
    async getUserWallets(username, auth_token) {
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
                        { user_ids: { $all: [user._id.toString()] } }
                    ).toArray()
                    return wallets
                },
                () => null
            )
        }
        return null
    },
    async newWallet(auth_token, newWalletData) {
        auth_token = await token.parse(auth_token.replace('Bearer ', ''))
        // console.log(auth_token)
        if (auth_token) {
            return await database.run(
                async (db) => {
                    const uid = auth_token.payload.sub
                    newWalletData.user_ids = [uid]
                    await db.collection('wallets').insertOne(newWalletData)
                    return true
                },
                () => false
            )
        }
        return false
    }
}

export default walletSrv