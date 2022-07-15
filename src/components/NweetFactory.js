import React, {useState} from "react";
import {dbService, storage} from "../myBase"
import {ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, getDocs, collection} from "firebase/firestore"
import {v4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attach, setAttach] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault();

        let attachmentUrl;
        if (attach !== "") {
            const attachmentRef = ref(storage, `${userObj.uid}/${v4()}`);
            const response = await uploadString(attachmentRef, attach, "data_url");
            attachmentUrl = await getDownloadURL(response.ref);
        }
        const nweetObj = {
            text: nweet,
            createdAt : Date.now(),
            creatorId : userObj.uid,
            attachmentUrl
        }

         const result = await addDoc(collection(dbService, 'nweets'), {
            nweetObj
        })
     
       
       setNweet("");
       setAttach("")

    }

    const onChange = (e) => {
        const {value} = e.target
        setNweet(value)
    }

    const onFileChange = (e) => {
        const {files} = e.target;

        const theFile = files[0];
        const reader = new FileReader();

        reader.onloadend = (finishedEvent) => {
            const {result} = finishedEvent.currentTarget;
            setAttach(result);
        }
        reader.readAsDataURL(theFile);

        
    }


    const onClearAttach = () => setAttach(null);

    return (
       
        <form action="" onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input" maxLength={120} value={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120} />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
                
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange}  style={{
                opacity: 0,
            }} />
            {attach &&
            <div className="factoryForm__attachment"> 
                <img src={attach} style={{
                    backgroundImage: attach,
                }} /> 

                <div className="factoryForm__clear" onClick={onClearAttach}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
            </div>
            }
        </form>
       
   
    )
}


export default NweetFactory;