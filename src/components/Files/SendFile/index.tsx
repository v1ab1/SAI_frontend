import { useSelector } from "react-redux";
import { API_URL } from "../../../API_URL";
import axios from 'axios';
import { selectJWT } from "../../../store/signedSlice";
import { useRef } from "react";
import "./styles.css";

export const FileUploadButton = ({getAllFiles}: {getAllFiles: () => void}) => {
  const token = useSelector(selectJWT);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const url = API_URL + 'files'
    
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(url, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`,
      },
        })
        .then((response) => {
          getAllFiles();
          console.log("File uploaded successfully");
          // Handle the response from the backend if needed
        })
        .catch((error) => {
          console.error("Error uploading file", error);
          // Handle the error if needed
        });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  
  return (
    <>
        <input type="file" ref={fileInputRef} hidden onChange={handleFileUpload} placeholder="" />
    <button className="sendfile_button" type="button" onClick={handleClick}>
    Выберите файл
  </button>
    </>
  );
};  