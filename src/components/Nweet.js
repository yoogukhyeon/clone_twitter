import React from "react";
import {doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService, storage } from "../myBase";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

export default function Nweet({img, text, isOwner, id}){

    const [edit, setEdit] = useState(false);
    const [newNweet, setNewNweet] = useState(text)
   
    const onDelete = async () => {
        const ok = window.confirm("정말로 삭제하시겠습니까?");

        if(ok){

            try{
                //리터럴
                const NweetRef =doc(dbService, "nweets", `${id}`);

                const desertRef = ref(storage, img);
                // delete 부분
                const result = await deleteDoc(NweetRef); 

                if(img != ""){
                    await deleteObject(desertRef);
                }
            }catch(err){
                console.log("실패했습니다.", err)
            }
          
        } 

    }

    const toggleEdit = () => {setEdit(prev => !prev)}
    const onSubmit = async (e) => {
        e.preventDefault();

        const result = await updateDoc(doc(dbService, "nweets", `${id}`), {text: newNweet});
        setEdit(false);
    }
    const onChange = (e) => {
        const {value} = e.target;

        setNewNweet(value)
    };

    return(
        <div className="nweet">
            {edit ? (
                <>
                  <form onSubmit={onSubmit} className="container nweetEdit">
                    <input type="text"  className="formInput" autoFocus onChange={onChange} placeholder="글을 수정해주세요." value={newNweet} required/>
                    <input type="submit" value="Update" className="formBtn" />
                  </form>
                  <span onClick={toggleEdit} className="formBtn cancelBtn">
                      Cancel
                  </span>
                </>
            ) : (
                <>
                  <h4>{text}</h4>
                  {img && (
                    <img src={img} alt="이미지" />
                  )}
                  {isOwner && (
                      <div className="nweet__actions">
                          <span onClick={onDelete}><FontAwesomeIcon icon={faTrash}/></span>
                          <span onClick={toggleEdit}><FontAwesomeIcon icon={faPencilAlt}/></span>
                      </div>
                  )}
                </>
            )}

          
           
        </div>
    )
};