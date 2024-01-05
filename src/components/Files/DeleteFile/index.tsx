import axios from "axios";
import { API_URL } from "../../../API_URL";
import "./styles.css"
import { useSelector } from "react-redux";
import { selectJWT } from "../../../store/signedSlice";

export const DeleteFile = ({setDeletingId, id, getAllFiles}: {setDeletingId: (id: number | null) => void, id: string, getAllFiles: () => void}) => {
  const token = useSelector(selectJWT)

  const deleteFile = async () => {
    try {
        const url = API_URL + 'files'
        await axios.delete(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: {
            id: id,
        },      
        });
        console.log("File deleted successfully");
        getAllFiles()
        setDeletingId(null)
        // Handle the file deletion success
    } catch (error) {
        console.error("Error deleting file", error);
        // Handle the error if needed
    }
  };

  return (
  <div className="delete_wrapper">
    <div className="delete_content">
      <h2 className="delete_header">
        Вы уверены, что хотите удалить файл?
      </h2>
      <div className="delete_buttons">
        <button className="delete_button" onClick={() => setDeletingId(null)}>
          Нет
        </button>
        <button className="delete_button" onClick={deleteFile}>
          Да
        </button>
      </div>
    </div>
  </div>
  )
}