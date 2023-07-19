import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';

const credentials = process.env.BALANCIO_DB_CERT

const client = new MongoClient('mongodb+srv://freecluster.aqgrrpg.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1
});

async function run() {
    try {
        await client.connect();
        const database = client.db("balancio");
        const collection = database.collection("transactions");
        const docCount = await collection.countDocuments({});
        // console.log(docCount);
        
        const cursor = collection.find()
        for (let doc = await cursor.tryNext(); doc != null; doc = await cursor.tryNext()) {
            console.log(doc.name)
        }
        // perform actions using client
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);
