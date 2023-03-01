const express = require("express");
const { MongoClient } = require("mongodb");
const QRCode = require("qrcode");

const app = express();
const uri =
  "mongodb+srv://admincz:marjorie@cluster0.yqxp8dx.mongodb.net/?retryWrites=true&w=majority";

// Connect to the MongoDB instance
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  if (err) console.error(err);
});

const db = client.db("studentFlow2");
const studentsCollection = db.collection("students");
const qrcodesCollection = db.collection("qrcodes");

// Create an endpoint for generating and storing the QR code
app.post("/generate-qr-code", async (req, res) => {
  try {
    // Fetch the list of students
    const studentsIdList = await studentsCollection
      .find({}, { School_Id: 1 })
      .toArray();

    // Generate the QR code for each student
    const qrCodes = studentsIdList.map(async (student) => {
      const { School_Id } = student;
      const qrCodeData = School_Id;
      const qrCode = await QRCode.toDataURL(qrCodeData);
      console.log(JSON.stringify(qrCode));
      return { qrcode: qrCode };
    });

    // Wait for all the QR codes to be generated
    const qrCodesArray = await Promise.all(qrCodes);
    console.log(`qrCodesArray = ${JSON.stringify(qrCodesArray)}`);

    // Store the QR codes in the Strapi backend
    // const promises = qrCodesArray.map((qrCode) => {
    //   return qrCodes.create({ qrCode });
    // });
    // await Promise.all(promises);
    await qrcodesCollection.insertMany(qrCodesArray);

    res
      .status(200)
      .send({ message: `success ${JSON.stringify(qrCodesArray)}}` });
  } catch (err) {
    console.error(`error is = ${err}`);
    res.status(500).send({ error: "Error generating QR code" });
  }
});

const port = process.env.PORT || 8880;
// Start the Express server
app.listen(port, () => {
  console.log(`QR code generation endpoint listening on port ${port}`);
});
