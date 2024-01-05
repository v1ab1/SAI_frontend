import { Route, Routes } from "react-router-dom";
import "./App.css"
import { Header } from "./components/Header";
import { Main } from "./screens/Main";
import { Auth } from "./screens/Auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setJWT } from "./store/signedSlice";

export const App = () => {
  const getCookie = (name: string): string | null => {
    const value = String(document.cookie);
    const parts = value.split(name + '=');
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null;
    }
    return null;
  }

  const dispatch = useDispatch();

  useEffect(() => {
    const jwtToken = getCookie("jwt");
    dispatch(setJWT(jwtToken));
    console.log(jwtToken)
  }, []);

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
    </>
  );
}
