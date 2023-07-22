import { MongoClient, ServerApiVersion } from 'mongodb';
import { config as envConfig } from 'dotenv'

console.log('[ database / config ]')

// Loads environment variables from .env file
envConfig()

// Read DB config environment variables
const CERT = process.env.DB_CONN_CERT
const URL = process.env.DB_CONN_URL
const NAME = process.env.DB_NAME

// Prepare data for export
const client = new MongoClient( URL, { tlsCertificateKeyFile: CERT, serverApi: ServerApiVersion.v1 });
const dbName = NAME

export { client, dbName }