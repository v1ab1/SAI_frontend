import { useState } from "react"
import axios from 'axios';
import { API_URL } from "../../API_URL";
import "./styles.css"
import { useDispatch } from "react-redux";
import { setJWT } from "../../store/signedSlice";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const [isLogin, setLogin] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const sendLogin = async () => {
        const url = API_URL + 'auth/' + (isLogin ? 'login' : 'register')
        const response = await axios.post(url, { password, email })
        const token = response.data.token;

        // Save the token as a cookie with an expiration date
        document.cookie = `jwt=${token}; expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()}`;
        dispatch(setJWT(token));
        navigate("/");
    }

    return (
        <div className="auth_wrapper">
            <div className="auth_content">
                <h1 className="auth_header">
                    {isLogin ? 'Вход' : 'Регистрация'}
                </h1>
                <p className="auth_subheader">
                    Почта
                </p>
                <input className="auth_input" value={email} onChange={(e) => setEmail(e.target.value)}  />
                <p className="auth_subheader">
                    Пароль
                </p>
                <input className="auth_input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="auth_button" onClick={sendLogin}>
                    Отправить
                </button>
                <p className="auth_change" onClick={() => setLogin(!isLogin)}>
                    {isLogin ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
                </p>
            </div>
        </div>
    )
}