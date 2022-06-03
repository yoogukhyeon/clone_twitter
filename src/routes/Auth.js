import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        const {name, value} = event.target;

        if(name === 'email'){
            setEmail(value)
        }else if(name === 'password'){
            setPassword(value)
        }

        console.log("email ::", email)
        console.log("password ::", password)
    
    }
    const onSubmit = (event) => {
        event.preventDefault();
    }

    return(
    <div>
        <form onSubmit={onSubmit}>
            <input type="text" 
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
                   />
            <input type="submit" value="Log In" />
        </form>
        <div>
            <button>Continue with Google</button>
        </div>
    </div>
    )
}


export default Auth;