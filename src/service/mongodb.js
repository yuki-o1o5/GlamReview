const { MongoClient } = require("mongodb");

const URL = process.env.MONGO_URL,
  dbName = process.env.MONGO_DB_NAME;

const mongoConnect = async () => {
  const dbo = await MongoClient.connect(URL);

  // check if db exists
  const dbList = await dbo.db().admin().listDatabases();
  console.log(dbList);
  const dbExists = dbList.databases.find((db) => db.name === dbName);
  if (!dbExists) {
    const reviews = [
      {
        productId: 1,
        user: "yuki",
        review: "hello",
      },
      {
        productId: 2,
        user: "max",
        review: "bye",
      },
      {
        productId: 1,
        user: "alex",
        review: "how r you",
      },
    ];
    await dbo.db(dbName).collection("reviews").insertMany(reviews);
  }
  console.log("connected", dbName);
  return dbo.db(dbName);
};

module.exports = { mongoConnect };
