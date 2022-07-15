import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "../routes/Profile"

const AppRouter = ({refreshUser, isLoggedIn, userObj}) => {
    
    return (
        <BrowserRouter>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <>
                {isLoggedIn ?
                <div     style={{
                    maxWidth: 890,
                    width: "100%",
                    margin: "0 auto",
                    marginTop: 80,
                    display: "flex",
                    justifyContent: "center",
                  }}>
                    <Routes>
                        <Route exact path="/" element={<Home userObj={userObj} />} />
                        <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />}/>
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </div>
                 :
                 <>
                 <Routes>
                    <Route exact path="/" element={<Auth />} />
                    <Route path='*' element={<Navigate to='/' />} />
                </Routes>
                  </>
                }
            </>
        </BrowserRouter>
    )

}


export default AppRouter



