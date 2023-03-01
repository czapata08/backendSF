const express = require("express");
const generateQRCode = require("./qr-generator");
const mongodb = require("mongodb");

const app = express();

const uri =
  "mongodb+srv://admincz:marjorie@cluster0.yqxp8dx.mongodb.net/?retryWrites=true&w=majority";

app.listen(3838, async (req, res) => {
  console.log("Server is listening on port 3838");
  try {
    const db = await mongodb.MongoClient.connect(uri, {
      useNewUrlParser: true,
    });
    const studentIds = await db("studentFlow2")
      .collection("students")
      .find({})
      .toArray()
      .map((student) => student._id);
    db.close();

    studentIds.forEach(async (studentId) => {
      await generateQRCode(studentId);
      console.log(`${JSON.stringify(res)}`);
    });
  } catch (error) {
    console.log(error);
  }
});
