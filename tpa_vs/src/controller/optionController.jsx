import React, { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import { useNavigate } from "react-router-dom";

export const Accept = async(e, dbName,id, status ) =>{
    // const navigate = useNavigate();
    e.preventDefault();
    const docRef = doc(db, dbName, id);
    await updateDoc(docRef, {
        status: status
    });
    window.location.reload(true);
}

export const Reject = async(e, dbName,id, status ) =>{
    // const navigate = useNavigate();
    e.preventDefault();
    const docRef = doc(db, dbName, id);
    await updateDoc(docRef, {
        status: status
    });
    window.location.reload(true);
}