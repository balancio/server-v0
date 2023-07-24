import { Db } from "mongodb";
import { client, dbName } from "./config";

const CLIENT = client()
await CLIENT.connect()


const database = {

    /**
     * Generic callback type for executing functions on MongoDB Database
     * @callback MongoCallback
     * @param {Db} db - MongoDB Database Object
     */

    /**
     * Connects with database and then calls toRun callback function
     * @param {MongoCallback} toRun - Function that is called after successfull connection with database
     */
    async run(toRun, onErr = async () => undefined) {
        try {
            const db = CLIENT.db(dbName)
            return await toRun(db)
        }
        catch (e) {
            console.log('[Database Run] Error!')
            console.log(e)
            return await onErr()
        }
        // finally {
        //     await CLIENT.close()
        // }
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