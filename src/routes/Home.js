import React from "react";
import { useState } from "react";
import { dbService, storage } from "../myBase";
import {collection, addDoc, getDocs, onSnapshot} from "firebase/firestore"
import { useEffect } from "react";
import Nweet from "../components/Nweet";
import {ref, uploadString, getDownloadURL } from "firebase/storage";
import {v4} from "uuid";
import NweetFactory from "../components/NweetFactory";
const Home = ({userObj}) => {
    
    const [nweets, setNweets] = useState([]);
    

    useEffect(() => {
       /*  async function getData(){
            const result = await getDocs(collection(dbService, 'nweets'));
            result.forEach(data => {
                const nweetObj = {
                    ...data.data(),
                    id: data.id,
                    creatorId : userObj.uid
                }

                setNweets(prev => [nweetObj, ...prev])
            })
        }
        getData(); */

        //realtime 스냅챗
        onSnapshot(collection(dbService, 'nweets'), (doc) => {
            const nweetArray = doc.docs.map(doc => ({id : doc.id, ...doc.data()}))
            setNweets(nweetArray)
        })

    }, [])


    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((val, idx) => (
                    <Nweet key={val.id} id={val.id} text={val.nweetObj.text} img={val.nweetObj.attachmentUrl} isOwner={val.nweetObj.creatorId === userObj.uid} />
                ))}
                
            </div>
        </div>
    )
};


export default Home


