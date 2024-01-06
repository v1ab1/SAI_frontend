import { useDispatch, useSelector } from "react-redux";
import { SQL, Mongo, Excel, CSV, Cross } from "../../SVGs"
import axios from "axios"
import "./styles.css"
import { selectJWT, setSelectedFile } from "../../../store/signedSlice";
import { selectFile } from "../../../store/signedSlice";
import { API_URL } from "../../../API_URL";

export const File = ({id, text, filename, setDeletingId}: {id: number; text: string; filename: string; setDeletingId: (id: number | null) => void}) => {
    const extension = text.slice(text.lastIndexOf('.')).toLowerCase()
    const dispatch = useDispatch()
    const activeFile = useSelector(selectFile)
    const token = useSelector(selectJWT)

    const getLogo = () => {
        switch (extension) {
            case '.xls':
            case '.xlsx':
                return <Excel />
            case '.csv':
                return <CSV />
            default:
                return <SQL />
        }
    }

    const setActiveFile = () => {
        dispatch(setSelectedFile(filename))
    }

    const downloadFile = async () => {
        const url = API_URL + 'files/' + filename
        const response = await axios.get(url, {
        responseType: 'blob', // получить данные файла в виде потока
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', text); // имя файла для скачивания
        document.body.appendChild(link);
        link.click();

        // Очищаем объект URL и удаляем ссылку после скачивания
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
    }

    const styles = {
        backgroundColor: activeFile === filename ? 'rgb(0, 110, 219)' : undefined, 
        color: activeFile === filename ? 'white' : undefined
    }

    return (
    <>
    <button className="file" onClick={setActiveFile} style={styles}>
        <div className="file_leftside">
            <div className="file_logo" onClick={downloadFile}>
                {getLogo()}
            </div>
            <div className="file_name">
                {text}
            </div>
        </div>
        <div className="file_rightside">
            <button className="file_logo" onClick={() => setDeletingId(id)}>
                <Cross isActive={activeFile === filename} />
            </button>
        </div>
    </button>
    </>)
}