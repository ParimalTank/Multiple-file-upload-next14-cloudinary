import React from 'react'
import { useDropzone } from "react-dropzone";
import styles from "../styles/Home.module.css";
import { useCallback, useState, useMemo } from "react";
import axios from "axios";

const MultiFileUpload = () => {

  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      setSelectedImages((prevState) => [...prevState, file]);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop });

  const onUpload = async () => {
    setUploadStatus("Uploading....");
    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("file", image);
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload",
        formData
      );
      console.log(response.data);
      setUploadStatus("upload successful");
    } catch (error) {
      console.log("imageUpload" + error);
      setUploadStatus("Upload failed..");
    }
  };

  const style = useMemo(
    () => ({
      ...(isDragAccept ? { borderColor: "#00e676" } : {}),
      ...(isDragReject ? { borderColor: "#ff1744" } : {})
    }),
    [isDragAccept, isDragReject]
  );


  return (
    <div className={styles.container}>
      <div className={styles.dropzone} {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop file(s) here ...</p>
        ) : (
          <p>Drag and drop file(s) here, or click to select files</p>
        )}
      </div>

      <div className={styles.images}>
        {selectedImages.length > 0 &&
          selectedImages.map((image, index) => (
            <img src={`${URL.createObjectURL(image)}`} key={index} alt="" />
          ))}
      </div>

      {selectedImages.length > 0 && (
        <div className={styles.btn}>
          <button onClick={onUpload}>Upload to Cloudinary</button>
          <p>{uploadStatus}</p>
        </div>
      )}
    </div>
  )
}

export default MultiFileUpload