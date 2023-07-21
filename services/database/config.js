import { MongoClient, ServerApiVersion } from 'mongodb';

const credentials = process.env.BALANCIO_DB_CERT

const client = new MongoClient(
    'mongodb+srv://freecluster.aqgrrpg.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', 
    { tlsCertificateKeyFile: credentials, serverApi: ServerApiVersion.v1 }
);

const dbName = "balancio"

export { client, dbName }