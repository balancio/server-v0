import { Db, MongoClient } from "mongodb";
import { client, dbName } from "./config";

const database = {

    /**
     * Generic callback type for executing functions on MongoDB Database
     * @callback MongoCallback
     * @param {Db} client - MongoDB Database Object
     */

    /**
     * Connects with database and then calls toRun callback function
     * @param {MongoCallback} toRun - Function that is called after successfull connection with database
     */

    async run(toRun, onErr) {
        try {
            await client.connect()
            const db = client.db(dbName)
            await toRun(db)
            await client.close()
            return true
        } catch {
            console.log('')
            await client.close()
            return false
        }
    }
}

const c = Math.random()
console.log(`[ database index, random number ${c}]`)

export default database

// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("balancio");
//         const collection = database.collection("transactions");
//         const docCount = await collection.countDocuments({});
//         // console.log(docCount);
        
//         const cursor = collection.find()
//         for (let doc = await cursor.tryNext(); doc != null; doc = await cursor.tryNext()) {
//             console.log(doc.name)
//         }
//         // perform actions using client
//     } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//     }
// }
// run().catch(console.dir);