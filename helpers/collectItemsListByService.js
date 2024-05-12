const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv");
dotenv.config();
const connectionString = `mongodb+srv://${process.env["MONGO_DB_USERNAME"]}:${process.env["MONGO_DB_PASSWORD"]}@cluster0.aaxi8.mongodb.net/?retryWrites=true&w=majority`;

const collectItemsListByService = async (languageId) => {
  let client = await MongoClient.connect(connectionString);
  console.log("Connected to MongoDB");
  let db = client.db("WorldServiceData");
  try {
    const cursor = db.collection("aresData").find({ "passport.language": languageId}).sort({ _id: -1 }).limit(5);

    const itemsList = (await cursor.toArray()).map(item => item.url)

  return itemsList

  } finally {
    client.close();
  }
};

module.exports = { collectItemsListByService };
