import hash from './hash'
import { config as envConfig } from 'dotenv'
import database from '../database'

envConfig()

const SECRET = process.env.AUTH_TOKEN_SECRET

const enc_b64 = (data) => Buffer.from(data, 'utf-8').toString('base64')
const dec_b64 = (data) => Buffer.from(data, 'base64').toString('utf-8')

const sign = (header, payload, pass_hash) => hash.sha512(`${header}.${payload}.${pass_hash}.${SECRET}`)

const getPassHash = async (username) => {
    const pass_hash = await database.run(async (db) => 
    {
        const user = await db.collection('users').findOne({ 'username': username })
        return user.password_hash
    })
    return pass_hash
}

const token = {

    async generate(username) {
        const header = enc_b64(JSON.stringify({ typ: 'custom_experimental' }))
        const payload = enc_b64(JSON.stringify({ iat: Date.now(), sub: username }))
        const signature = sign(header, payload, await getPassHash(username))
        return `${header}.${payload}.${signature}`
    },

    async verify(token) {
        token = token.split('.')
        const header = token[0]
        const payload = token[1]
        const signature = token[2]

        console.log('Payload:')
        console.log(dec_b64(payload))
        const pass_hash = await getPassHash(JSON.parse(dec_b64(payload)).sub)
        
        return signature === sign(header, payload, pass_hash)
    }
    
}

export default token