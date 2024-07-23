import { useState } from "react";
import {authCtx} from "./authContext";

export default function AuthContextProvider({children}) {
  const [token, setToken] = useState('');
  const [username,setUsername]=useState('')

  function login(data,name) {
    setToken(data)
    setUsername(name)
    
  }

  function logout(){
    setToken('')
    setUsername('')
    localStorage.removeItem('username');
    localStorage.removeItem('token');
  }

  return (
    <authCtx.Provider value={{ username,token, login ,logout}}>{children}</authCtx.Provider>
  );
}
