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
    }
}

export default walletSrv