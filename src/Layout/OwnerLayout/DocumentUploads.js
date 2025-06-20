import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";

const DocumentUploads = () => {
  const [documents, setDocuments] = useState([]);
  const [fileInput, setFileInput] = useState(null);

  // Fetch documents from backend
  const fetchDocuments = async () => {
    try {
      const response = await axios.get("https://localhost:7252/api/Document");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => {
    setFileInput(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (fileInput) {
      const formData = new FormData();
      formData.append("file", fileInput);
      formData.append("fileName", fileInput.name);
      formData.append("documentType", "Lease Agreement"); // Optional: add UI to select type

      try {
        await axios.post("https://localhost:7252/api/Document", {
          fileName: fileInput.name,
          documentType: "Lease Agreement", // or dynamic
        });

        setFileInput(null);
        document.getElementById("fileInput").value = "";
        fetchDocuments(); // refresh after upload
      } catch (error) {
        console.error("Upload failed:", error);
      }
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
                <th>Document Type</th>
                <th>Uploaded At</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.fileName}</td>
                  <td>{doc.documentType}</td>
                  <td>{new Date(doc.uploadedAt).toLocaleString()}</td>
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
