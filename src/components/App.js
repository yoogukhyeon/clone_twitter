import React,{useState} from "react";
import AppRouter from "./Router";
import { authService } from "../myBase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  
  console.log(authService.currentUser)
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
