import { config as envConfig } from 'dotenv'
import { Db } from 'mongodb'
import hash from './_hash'

envConfig()

const SECRET = process.env.AUTH_TOKEN_SECRET

const enc_b64 = (data) => Buffer.from(data, 'utf-8').toString('base64')
const dec_b64 = (data) => Buffer.from(data, 'base64').toString('utf-8')

/**
 * @param {string} header 
 * @param {string} payload 
 * @param {string} pass_hash 
 * @returns {string} Auth Token Signature
 */
const sign = (header, payload, pass_hash) => hash.sha512(`${header}.${payload}.${pass_hash}.${SECRET}`)

/**
 * @param {string} username 
 * @param {Db} db 
 * @returns Returns password hash string if it exist, `null` otherwise
 */
const getPassHash = async (username, db) => {
    try {
        const user = await db.collection('users').findOne({ 'username': username })
        return user.password_hash
    }
    catch {
        return null
    }

}

const token = {

    /**
     * @param {string} username 
     * @param {Db} db 
     * @returns Returns auth token string
     */
    async generate(username, db) {
        const header = enc_b64(JSON.stringify({ typ: 'custom_experimental' }))
        const payload = enc_b64(JSON.stringify({ iat: Date.now(), sub: username }))
        const signature = sign(header, payload, await getPassHash(username, db))
        return `${header}.${payload}.${signature}`
    },

    /**
     * @param {string} token 
     * @param {Db} db 
     * @returns
     */
    async validate(token, db) {
        try {
            token = token.split('.')
            const header = token[0]
            const payload = token[1]
            const signature = token[2]

            // console.log('Payload:')
            // console.log(dec_b64(payload))
            const pass_hash = await getPassHash(JSON.parse(dec_b64(payload)).sub, db)
            
            return signature === sign(header, payload, pass_hash)
        }
        catch {
            return false
        }
    },

    async parse(token) {
        try {
            token = token.split('.')
            return {
                header: JSON.parse(dec_b64(token[0])),
                payload: JSON.parse(dec_b64(token[1]))
            }
        }
        catch {
            return null
        }
    }
    
}

export default token