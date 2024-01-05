import { useSelector } from "react-redux";
import { selectJWT } from "../../store/signedSlice";
import { Link } from "react-router-dom";
import "./styles.css"

export const Header = () => {
    const jwt = useSelector(selectJWT);
    return (
        <div className="header">
            <Link to="/" className="header_links">
                Главная
            </Link>
            <Link to='/auth' className="header_links">
                {jwt ? 'Выйти' : 'Войти'}
            </Link>
        </div>
    )
}