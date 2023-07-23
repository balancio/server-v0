import database from '../database'
import hash from './hash'
import token from './token'

const auth = {
    /**
     * Checks login credentials and if valid generates new auth token
     * @param {string} user 
     * @param {string} pass 
     * @returns Returns newly generated token string
     */
    async login(user, pass) 
    {
        const auth_token = await database.run(async (db) => 
        {
            const coll = await db.collection('users').findOne({ 'username': user })
            const pass_hash = hash.sha512(pass + coll.password_salt)
            if (pass_hash === coll.password_hash)
                return token.generate(user)
            return undefined
        })
        
        console.log(`Auth Token: ${auth_token}`)
        return auth_token
    },

    /**
     * Checks if auth token is valid
     * @param {string} auth_token
     * @returns Returns true if token is valid, false otherwise
     */
    async validate(auth_token) 
    {
        const ok = await token.verify(auth_token)
        console.log(`Auth Token OK: ${ok}`)
        return ok
    }
}

export default auth