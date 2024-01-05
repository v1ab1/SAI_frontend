import { Files } from '../../components/Files'
import { Functions } from '../../components/Functions'
import { Settings } from '../../components/Settings'
import './styles.css'

export const Main = () => {
    return (
        <div className="main">
            <div className="child"><Files /></div>
            <div className="child"><Functions /></div>
            <div className="child"><Settings /></div>
            <div className="child"><Files /></div>
        </div>
    )
}