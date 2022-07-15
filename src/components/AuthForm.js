import React, {useState} from "react";
import { auth } from "../myBase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"

export default function AuthForm({newAccount, setNewAccount}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    return(
        <>
            <form onSubmit={onSubmit} className="container">
                <input type="email" 
                    placeholder="Email" 
                    required 
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="authInput"
                    />
                <input type="password" 
                    name="password"
                    placeholder="Password" 
                    required 
                    value={password}
                    onChange={onChange}
                    autoComplete="on"
                    className="authInput"
                    />
                <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log In"} />
                { <p className="authError">{error}</p>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccount ? "Log In." : "Create Account."}
            </span>
        </>
    )
}