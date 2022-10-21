import React, { useContext, useState } from "react";
import { ContentContext } from "../context/ContentProvider";

export default function FileUploader() {
  const { uploadFile, uploadedFile, state } = useContext(ContentContext);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Choose file");
  const [isDisabled, setIsDisabled] = useState(false);

  const userId = state.user._id;

  function onChange(e) {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  }

  const handleFileUpload = (e) => {
    uploadFile(file, fileName, userId);
    setIsDisabled(true)
    setFile('')
  };

  return (
    <div className="file-uploader">
      <label>{fileName}</label>
      <input type="file" onChange={onChange} />
      <button type="button" onClick={handleFileUpload} className={file && "button-emphasized"} disabled={isDisabled}>Upload</button>
    </div>
  );
}
