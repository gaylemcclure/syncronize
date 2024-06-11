import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://gaylekdennison:vtbUeBEZESXUebGU@sycronize-db.ot1tsko.mongodb.net/?retryWrites=true&w=majority&appName=sycronize-db";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  // Connect the client to the server
  await client.connect();
  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("sync_db");


export default db;