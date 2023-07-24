import hashSrv from './_hash'
import tokenSrv from './_token'
import database from '../../database'

/**
 * Public API: Authentication and Authorization Service
 */
const auth = {
    /**
     * Checks login credentials and if valid generates new auth token
     * @param {string} user 
     * @param {string} pass 
     * @returns Returns newly generated token string
     */
    async login(user, pass) 
    {
        return await database.run(async (db) => 
        {
            console.log('[Auth Service] Login')
            console.log(`user: ${user}, pass ${pass}`)
            const coll = await db.collection('users').findOne({ 'username': user })
            const pass_hash = hashSrv.sha512(pass + coll.password_salt)
            if (pass_hash === coll.password_hash)
                return await tokenSrv.generate(user, db)
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
                auth_token = auth_token.replace('Bearer ', '')
                return await tokenSrv.validate(auth_token)
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