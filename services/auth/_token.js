import { config as envConfig } from 'dotenv'
import { Db, ObjectId } from 'mongodb'
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
const getPassHash = async (id, db) => {
    try {
        // console.log(db ? 'Db is not null' : 'Db is null?!')
        // console.log(`User ID: ${id}`)
        const user = await db.collection('users').findOne({ '_id': id })
        return user.password_hash
    }
    catch (c) {
        console.log(c)
        return null
    }

}

const token = {

    /**
     * @param {string} id 
     * @param {Db} db 
     * @returns Returns auth token string
     */
    async generate(id, username, db) {
        const header = enc_b64(JSON.stringify({ typ: 'custom_experimental' }))
        const payload = enc_b64(JSON.stringify({ iat: Date.now(), sub: id }))
        const pass_hash = await getPassHash(id, db)
        const signature = sign(header, payload, pass_hash)
        // console.log(`Header: ${header}`)
        // console.log(`Payload: ${payload}`)
        // console.log(`Pass Hash: ${pass_hash}`)
        // console.log(`Signature: ${signature}`)
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

            console.log(`[Token Service] Validate | Token Payload:\n${dec_b64(payload)}`)
            const user_id = new ObjectId(JSON.parse(dec_b64(payload)).sub)
            const pass_hash = await getPassHash(user_id, db)

            // console.log(`Header: ${header}`)
            // console.log(`Payload: ${payload}`)
            // console.log(`Pass Hash: ${pass_hash}`)
            // console.log(`Signature: ${signature}`)

            if (pass_hash == null)
                throw new Error('Password Hash read from DB is null. Is connection Ok?')

            const sig = sign(header, payload, pass_hash)
            // console.log(`SIG: ${signature}`)
            // console.log(`SIG: ${sig}`)
            return signature === sig
        }
        catch (e) {
            console.log(e)
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