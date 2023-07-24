import database from '../../database'
import hash from '../auth/_hash'
import token from '../auth/_token'

const salt = () => hash.sha512(Math.random().toString())

const userSrv = {
    async newUser(username, pass, pass_confirm) {
        if (pass !== pass_confirm)
            return false

        const pass_salt = salt()
        const pass_hash = hash.sha512(pass + pass_salt)
            
        const ok = await database.run(async (db) => {
            await db.collection('users').insertOne({ 
                'username': username,
                'password_hash': pass_hash,
                'password_salt': pass_salt,
            })
            return true
        })
        return ok ? true : false
    },

    async getUser(username, auth_token) {
        auth_token = await token.parse(auth_token.replace('Bearer ', ''))
        if (auth_token) {
            return await database.run(
                async (db) => {
                    const user = await db.collection('users').findOne({ username })
                    return user._id == auth_token.payload.sub ? user : null
                },
                () => null
            )
        }
        return null
    }
}

export default userSrv