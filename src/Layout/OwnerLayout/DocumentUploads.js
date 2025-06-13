 import React, { useState } from "react";
import "../../App.css";

const DocumentUploads = () => {
  const [documents, setDocuments] = useState([]);
  const [fileInput, setFileInput] = useState(null);

  const handleFileChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleUpload = () => {
    if (fileInput) {
      const newDoc = {
        name: fileInput.name,
        uploadedAt: new Date().toLocaleString(),
      };
      setDocuments([...documents, newDoc]);
      setFileInput(null);
      document.getElementById("fileInput").value = "";
    }
  };

  return (
    <div className="page-container">
      <h2>Document Uploads</h2>
      <p>Upload and manage documents related to your properties.</p>

      <div className="upload-section">
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleUpload} className="btn-upload">
          Upload Document
        </button>
      </div>

      <div className="document-list">
        {documents.length > 0 ? (
          <table className="income-table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.name}</td>
                  <td>{doc.uploadedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No documents uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentUploads;
