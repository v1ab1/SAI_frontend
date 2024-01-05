import axios from "axios";
import { useSelector } from "react-redux";
import { Func } from "../Functions/Func"
import { Ready } from "./Ready"
import { settings } from "./settings"
import { selectFile, selectSelectedMode } from "../../store/signedSlice";
import { useEffect, useState } from "react";
import { API_URL } from "../../API_URL";
import "./styles.css"

export const Settings = () => {
    const selectedFunc = useSelector(selectSelectedMode);
    const filename = useSelector(selectFile);
    const [selectedSetting, setSelectedSetting] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        setSelectedSetting('')
        setValue('')
    }, [selectedFunc])

    const sendFile = () => {
        const url = API_URL + selectedFunc
        if (filename) {
            axios.post(url, {value: value === '' ? selectedSetting : value, filename})
        }
    }

    return (
        <>
            {//@ts-expect-error
            selectedFunc && selectedFunc in settings ? Object.values(settings[selectedFunc]).length === 0 ? 
            <div className="value_wrapper">
                <p>
                    Название поля
                </p>
                <input className="value_input" placeholder="Введите название" onChange={(e) => setValue(e.target.value)} />
            </div> : 
            //@ts-expect-error
            Object.entries(settings[selectedFunc]).map(([key, text]) => (
                <button className="setting_buttton" key={key} onClick={() => setSelectedSetting(String(text))}>
                    <Func text={String(text)} isActive={selectedSetting === text} />
                </button>
            )) : null}
            {selectedFunc && selectedFunc in settings && (value !== '' || selectedSetting !== '') && <Ready onClick={sendFile} />}
        </>
    )
}