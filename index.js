import { database } from './services/database'

const data = []

const result = await database.run(
    async (db) => {
        const coll = db.collection("users")
        const cursor = coll.find()
        for (let doc = await cursor.tryNext(); doc != null; doc = await cursor.tryNext()) {
            console.log(doc.username)
            data.push(doc.username)
        }
    }
)

console.log(data)