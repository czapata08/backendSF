const express = require("express");
const generateQRCode = require("./qr-generator");

const app = express();

app.listen(3838, async (req, res) => {
  console.log("Server is listening on port 3838");
  try {
    const db = await mongodb.MongoClient.connect(`${process.env.MONGODB_URI}`, {
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
  } catch {
    if (error) {
      console.log(`error: ${JSON.stringify(res.error)}`);
    }
  }
});
