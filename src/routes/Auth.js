import React, { useState } from "react";
import { auth } from "../myBase";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
   
    const [newAccount, setNewAccount] = useState(true)
   
    const onSocialClick = async (e) => {
        const {name} = e.target;

        let provider = new GoogleAuthProvider();
        
        const data = await signInWithPopup(auth, provider)


        console.log("data", data)
    }
    return(
    <div className="authContainer">
        <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{ marginBottom: 30 }}
        />
        <AuthForm newAccount={newAccount} setNewAccount={setNewAccount} />
        
        <div className="authBtns">
            <button className="authBtn" onClick={onSocialClick} name="google">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
        </div>
    </div>
    )
}


export default Auth;

