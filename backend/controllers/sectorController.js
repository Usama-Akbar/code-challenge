const sector_schema = require("../utils/Schema/Sector/sector");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DATABASE_URI);
// const bcrypt = require("bcrypt");

const { ObjectId } = require("mongodb");

module.exports = {
  listSector: async function (req, res, next) {
    try {
      const list = await client
        .db(process.env.DATA_BASE)
        .collection("list")
        .find()
        .toArray();
      if (list === null || list.length === 0) {
        res.json({
          message: "No Data Found",
          result: true,
        });
      } else {
        res.json({ list, result: true });
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
  getSector: async function (req, res, next) {
    try {
      const list = await client
        .db(process.env.DATA_BASE)
        .collection("list")
        .findOne({ _id: new ObjectId(req.params.id) });
      if (list === null || list.length === 0) {
        res.json({
          message: "No Sector Found",
          result: true,
        });
      } else {
        res.json({ list, result: true });
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
  addSector: async function (req, res, next) {
    try {
      const { error } = sector_schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errorDetails = error.details.map((err) => {
          return {
            field: err.path[0],
            message: err.message,
          };
        });

        return res.status(400).json({ errors: errorDetails });
      }
      const event = {
        name: req.body.name,
        sector: req.body.sector,
        agreedTerms: req.body.agreedTerms,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const sector = await client
        .db(process.env.DATA_BASE)
        .collection("list")
        .insertOne(event);

      if (sector.insertedId) {
        res.json({
          message: "Sector added successfully!",
          result: true,
        });
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

  deleteSector: async function (req, res, next) {
    try {
      const sector = await client
        .db(process.env.DATA_BASE)
        .collection("list")
        .deleteOne({ _id: new ObjectId(req.params.id) });

      console.log(sector);
      if (sector === null || sector.length === 0) {
        res.json({
          message: "Sector not found!",
          result: true,
        });
      } else {
        res.json({
          message: "Your Sector has been Deleted Successfully!",
          result: true,
        });
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
  updateSector: async function (req, res, next) {
    try {
      const { error } = sector_schema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        const errorDetails = error.details.map((err) => {
          return {
            field: err.path[0],
            message: err.message,
          };
        });

        return res.status(400).json({ errors: errorDetails });
      }
      const selectedSector = await client
        .db(process.env.DATA_BASE)
        .collection("list")
        .findOne({ _id: new ObjectId(req.params.id) });
      if (selectedSector === null || selectedSector.length === 0) {
        res.json({
          message: "Sector not found!",
          result: true,
        });
      } else {
        const sector = await client
          .db(process.env.DATA_BASE)
          .collection("list")
          .updateOne(
            { _id: new ObjectId(req.params.id) },
            {
              $set: {
                name: req.body.name,
                sector: req.body.sector,
                agreedTerms: req.body.agreedTerms,
                updatedAt: new Date(),
              },
            }
          );
        console.log(sector);
        res.json({
          message: "Your Sector has been Updated Successfully!",
          result: true,
        });
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
