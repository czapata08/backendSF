// // app.js
// const express = require("express");
// const cors = require("cors");
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// const app = express();
// app.use(cors());
// app.use(express.json());

// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post("/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   const filePath = file.path;
//   xlsx(
//     {
//       input: filePath,
//       output: "output.json",
//     },
//     function (err, result) {
//       if (err) {
//         console.error(err);
//         res.send(err);
//       } else {
//         console.log(result);
//         const uri = `${process.env.MONGODB_URI}`;
//         const client = new MongoClient(uri, { useNewUrlParser: true });
//         client.connect((err) => {
//           const db = client.db("test");
//           const collection = db.collection("students");
//           collection.insertMany(result, (err, result) => {
//             console.log("Student records inserted successfully!");
//             client.close();
//             res.send(result);
//           });
//         });
//       }
//     }
//   );
// });

// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}`));
