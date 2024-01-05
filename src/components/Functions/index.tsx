import { Func } from "./Func";
import { texts } from "./texts";
import "./styles.css"
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedMode, setSelectedMode } from "../../store/signedSlice";

export const Functions = () => {
    const dispatch = useDispatch();
    const selected = useSelector(selectSelectedMode);

    return (
        <>
            {Array.from(texts.entries()).map(([key, value], i) => (
                <button key={key} className="func_buttton" onClick={() => dispatch(setSelectedMode(key))}>
                    <Func text={value} isActive={selected === key} />
                </button>
            ))}
        </>
    )
}