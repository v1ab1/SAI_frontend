import { useEffect, useState } from 'react';
import { API_URL } from '../../API_URL';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectJWT } from '../../store/signedSlice';
import { DeleteFile } from '../Files/DeleteFile';
import { File } from "../Files/File";

interface FileData {
    originalName: string;
    id: number;
    filename: string;
}  

export const ModifiedFiles = ({isReload}: {isReload: boolean}) => {
    const token = useSelector(selectJWT)
    const [data, setData] = useState<FileData[]>([])
    const [deletingId, setDeletingId] = useState<number | null>(null)

    const getAllFiles = async () => {
        console.log(token)
        try {
          const url = API_URL + 'modifiedFiles/'
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data)
          console.log("Files:", response.data);
          // Handle the response from the backend if needed
        } catch (error) {
          console.error("Error retrieving files", error);
          // Handle the error if needed
        }
      };

    useEffect(() => {
        if (token) {
            getAllFiles();
        }
    }, [token, isReload]);

    return (
        <>
        {data.map((el, i) => <File id={el.id} filename={el.filename} text={el.originalName} setDeletingId={setDeletingId} key={el.id} />)}
        {deletingId && <DeleteFile id={String(deletingId)} getAllFiles={getAllFiles} setDeletingId={setDeletingId} />}
        </>
    )
}