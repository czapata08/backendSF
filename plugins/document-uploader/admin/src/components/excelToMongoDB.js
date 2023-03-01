import React, { useState } from "react";
const XLSX = require("xlsx");
import { useMutation, gql } from "@apollo/client";
import client from "../client";

const ADD_STUDENT_MUTATION = gql`
  mutation CreateStudent($input: createStudentInput) {
    createStudent(input: $input) {
      student {
        Forename
        PreferedName
        Surname
        School_Id
        DOB
      }
    }
  }
`;

const ExcelToMongoDB = () => {
  const [doc, setDoc] = useState(null);
  const [fileType, setFileType] = useState("");
  const [createStudent, { data, loading, error }] = useMutation(
    ADD_STUDENT_MUTATION,
    { client }
  );

  !error && console.log(`error in request ${JSON.stringify(error)}`);
  data && console.log(`data from request ${data}`);

  const handleFile = (file) => {
    if (
      doc &&
      doc.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFileType("xlsx file loaded");
    } else {
      setFileType(`data type is of type=${typeof doc}`);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const binarydoc = e.target.result;
      const workbook = XLSX.read(binarydoc, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const userDoc = XLSX.utils.sheet_to_json(worksheet);
      console.log(`userDoc variable = ${JSON.stringify(userDoc)}`);
      setDoc(userDoc);
    };
    console.log(`doc inside handle function ${JSON.stringify(doc)}`);
    reader.readAsBinaryString(file);
  };

  const submitToApi = async () => {
    console.log(`doc inside submit function ${JSON.stringify(doc)}`);

    doc.forEach((student) => {
      createStudent({
        variables: {
          input: {
            data: {
              Forename: student.Forename,
              PreferedName: student.PrefferedName,
              Surname: student.Surname,
              School_Id: student.School_Id,
              DOB: student.School_Id,
            },
          },
        },
      });
    });
  };

  console.log(`doc in function scope ${JSON.stringify(doc)}`);

  return (
    <div>
      <input type="file" onChange={(e) => handleFile(e.target.files[0])} />
      <p>{fileType}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          submitToApi();
        }}
      >
        Submit
      </button>
      {error && <p>`Error: ${error}`</p>}
      {loading && <p>`Loading`</p>}
      {doc && <pre>{JSON.stringify(doc, null, 2)}</pre>}
    </div>
  );
};

export default ExcelToMongoDB;
