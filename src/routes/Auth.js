import React, { useState } from "react";
import { auth } from "../myBase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {name, value} = event.target;

        if(name === 'email'){
            setEmail(value)
        }else if(name === 'password'){
            setPassword(value)
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try{

            let data;
            if(newAccount){
                //create Account
                 data = await createUserWithEmailAndPassword(auth, email, password);
                 setEmail("")
                 setPassword("")
            }else{
                //login In
                 data = await signInWithEmailAndPassword(auth, email, password)
                 
            }

            console.log("data", data)
        }catch(error){
            console.log(error.message)
            setError(error.message)
        }
       
    }

    const toggleAccount = () => setNewAccount((prev) => !prev)
    const onSocialClick = async (e) => {
        const {name} = e.target;

        let provider = new GoogleAuthProvider();
        
        const data = await signInWithPopup(auth, provider)


        console.log("data", data)
    }
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input type="email" 
                   placeholder="Email" 
                   required 
                   name="email"
                   value={email}
                   onChange={onChange}
                   />
            <input type="password" 
                   name="password"
                   placeholder="Password" 
                   required 
                   value={password}
                   onChange={onChange}
                   autoComplete="on"
                   />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            { <p>{error}</p>}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Log In." : "Create Account."}</span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
        </div>
    </div>
    )
}


export default Auth;