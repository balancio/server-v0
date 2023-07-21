import { config as envConfig } from 'dotenv'
import express from 'express'
import { database } from './services/database'

envConfig()

// --- Setup Express Application ---

const srv = {
    PORT: Number(process.env.SRV_PORT),
    HOST: process.env.SRV_HOST,
}

console.log(srv)

const app = express()

app.listen(srv.PORT, srv.HOST, async () => {
    console.log(`Listening on port ${srv.PORT}`)
    // Test db conn
    await database.run(
        async (db) => {
            const coll = db.collection("users")
            const cursor = coll.find()
            for (let doc = await cursor.tryNext(); doc != null; doc = await cursor.tryNext()) {
                console.log(doc.username)
            }
        }
    )
})