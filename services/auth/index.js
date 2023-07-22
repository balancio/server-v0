import database from '../database'
import hash from './hash'

const auth = {
    async login(user, pass) {
        const ok = await database.run(async (db) => {
            const coll = await db.collection('users').findOne({ 'username': user })
            const pass_hash = hash.sha512(pass + coll.password_salt)
            if (pass_hash === coll.password_hash) {
                console.log('PASS OK')
            }
            console.log(coll.username)
        })
        console.log(ok)
    }
}

export default auth