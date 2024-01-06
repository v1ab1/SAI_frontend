import { useState } from 'react'
import { Files } from '../../components/Files'
import { Functions } from '../../components/Functions'
import { ModifiedFiles } from '../../components/ModifiedFiles'
import { Settings } from '../../components/Settings'
import './styles.css'

export const Main = () => {
    const [isReload, setReload] = useState(false);

    return (
        <div className="main">
            <div className="child"><Files /></div>
            <div className="child"><Functions /></div>
            <div className="child"><Settings isReload={isReload} setReload={setReload} /></div>
            <div className="child"><ModifiedFiles isReload={isReload} /></div>
        </div>
    )
}