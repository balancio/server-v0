import hashSrv from './_hash'
import tokenSrv from './_token'
import database from '../../database'

/**
 * Public API: Authentication and Authorization Service
 */
const auth = {
    /**
     * Checks login credentials and if valid generates new auth token
     * @param {string} username 
     * @param {string} password 
     * @returns Returns newly generated token string
     */
    async login(username, password) 
    {
        return await database.run(async (db) => 
        {
            console.log(`[Auth Service] Login | Username: ${username}, Password ${password}`)
            const user = await db.collection('users').findOne({ 'username': username })
            const pass_hash = hashSrv.sha512(password + user.password_salt)
            if (pass_hash === user.password_hash)
                return await tokenSrv.generate(user._id, user.username, db)
            return null
        })
    },
    token: {
        /**
         * Checks if auth token is valid
         * @param {string} auth_token
         * @returns Returns `true` if token is valid, `false` otherwise
         */
        async validate(auth_token) 
        {
            if(auth_token) {
                return await database.run(async (db) => 
                {
                    auth_token = auth_token.replace('Bearer ', '')
                    return await tokenSrv.validate(auth_token, db)
                })
            }
            return false
        },

        /**
         * Converts token to JS object with header and payload
         * @param {string} auth_token
         * @returns Returns object `{ header: {...}, payload: {...} }` if token is valid, `null` otherwise
         */
        async parse(auth_token) 
        {
            if(auth_token) {
                auth_token = auth_token.replace('Bearer ', '')
                return await tokenSrv.parse(auth_token)
            }
            return null
        }
    }
}

export default auth