const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DATABASE_URI);
// const bcrypt = require("bcrypt");

module.exports = {
  sectorList: async function (req, res, next) {
    try {
      const sectors = await client
        .db(process.env.DATA_BASE)
        .collection("sectors")
        .find()
        .toArray();
      if (sectors === null || sectors.length === 0) {
        res.json({
          message: "Sectors not found!",
          result: true,
        });
      } else {
        res.json({ sectors, result: true });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
};
