const mongodb = require("mongodb");
const qrcode = require("qrcode");

const uri =
  "mongodb+srv://admincz:marjorie@cluster0.yqxp8dx.mongodb.net/?retryWrites=true&w=majority";

const generateQRCode = async (studentId) => {
  const db = await mongodb.MongoClient.connect(uri, {
    useNewUrlParser: true,
  });

  const bucket = new mongodb.GridFSBucket(db, { bucketName: "qrcodes" });

  const student = await db("studentFlow2")
    .collection("students")
    .findOne({ _id: studentId });
  const qrCodeData = JSON.stringify({
    Forename: student.Forename,
    PreferedName: student.PreferedName,
    Surname: student.Surname,
    School_Id: student.School_Id,
    DOB: student.DOB,
  });

  const qrCode = await qrcode.toBuffer(qrCodeData);
  const uploadStream = bucket.openUploadStream(studentId.toString());
  uploadStream.end(qrCode);

  db.close();
};

module.exports = generateQRCode;
