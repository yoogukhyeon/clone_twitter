import React,{useEffect, useState} from "react";
import AppRouter from "./Router";
import { auth } from "../myBase";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
      auth.onAuthStateChanged((user) => {
          if(user){
            setIsLoggedIn(true);
            setUserObj(user)
          }else{
            setIsLoggedIn(false)
          }
          setInit(true);
      })
  }, [])
  
  const [changeName,setChangeName] = useState(false);
  const refreshUser =()=>{
      setChangeName(prev=>!prev)
  }

  return (
    <>
      {init ? (<AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} />) : ("Initializing...")}
    </>
  );
}

export default App;
