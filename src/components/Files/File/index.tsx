import { useDispatch, useSelector } from "react-redux";
import { SQL, Mongo, Excel, CSV, Cross } from "../../SVGs"
import "./styles.css"
import { setSelectedFile } from "../../../store/signedSlice";
import { selectFile } from "../../../store/signedSlice";

export const File = ({id, text, filename, setDeletingId}: {id: number; text: string; filename: string; setDeletingId: (id: number | null) => void}) => {
    const extension = text.slice(text.lastIndexOf('.')).toLowerCase()
    const dispatch = useDispatch()
    const activeFile = useSelector(selectFile)

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

    const styles = {
        backgroundColor: activeFile === filename ? 'rgb(0, 110, 219)' : undefined, 
        color: activeFile === filename ? 'white' : undefined
    }

    return (
    <>
    <button className="file" onClick={setActiveFile} style={styles}>
        <div className="file_leftside">
            <div className="file_logo">
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