import React, { useEffect, useState } from "react";
import { auth } from "../myBase";
import {useNavigate} from "react-router-dom"
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { dbService } from "../myBase";
import { updateProfile } from "@firebase/auth";

export default ({userObj, refreshUser}) => {

    const navigate = useNavigate();
    const onLogOutClick = () =>  {
        auth.signOut();
        navigate('/')
    };

    const getMyNweets = async () => {
        const queryList = query(
            collection(dbService, "nweets"),
            where("creatorId", "==", userObj.uid),
            orderBy("createdAt", "desc")
        );

        const querySnapshot = await getDocs(queryList);
            querySnapshot.forEach((doc) => {
                console.log(doc)
                console.log(doc.id, "=>", doc.data());
            });

           
         
    };
    

    useEffect(() => {
        getMyNweets();
    }, []);

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onChange = (e) => {
        const {value} = e.target;

        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(userObj, { displayName: newDisplayName });
            refreshUser()
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" className="formInput" autoFocus onChange={onChange} value={newDisplayName} placeholder="Display Name" />
                <input type="submit" value="Update Profile"  
                       className="formBtn"
                       style={{
                           marginTop: 10,
                       }} 
                />
            </form>
            <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</button>
        </div>
    )
}