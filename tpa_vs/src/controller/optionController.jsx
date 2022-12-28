import React, { useEffect, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import {db} from '../firebase'
import { useNavigate } from "react-router-dom";
import moment from "moment";

export const Accept = async(e, dbName,id, status ) =>{
    // const navigate = useNavigate();
    e.preventDefault();
    const docRef = doc(db, dbName, id);
    if(dbName === 'purchase request'){
        await updateDoc(docRef, {
            status1: status
        });
    }else{
        await updateDoc(docRef, {
            status: status
        });
    }
    window.location.reload(true);
}
export const FixedFacility = async(e, dbName,id, status, itemId ) =>{
    // const navigate = useNavigate();
    e.preventDefault();
    const docRef = doc(db, dbName, id);
    const itemRef = doc(db, 'facility and equipment', itemId);
    let time = moment().format("DD-MM-YYYY")
    await updateDoc(docRef, {
        status: status
    });
    await updateDoc(itemRef, {
        lastMaintenance : time
    });
    window.location.reload(true);
}
export const BrokenFacility = async(e, dbName,id, status, itemId ) =>{
    // const navigate = useNavigate();
    e.preventDefault();
    const docRef = doc(db, dbName, id);
    const itemRef = doc(db, 'facility and equipment', itemId);
    let time = moment().format("DD-MM-YYYY")
    await updateDoc(docRef, {
        status: status
    });
    await updateDoc(itemRef, {
        status : "broken"
    });
    window.location.reload(true);
}

export const Reject = async(e, dbName,id, status ) =>{
    // const navigate = useNavigate();
    e.preventDefault();
    const docRef = doc(db, dbName, id);
    if(dbName === 'purchase request'){
        await updateDoc(docRef, {
            status1: status
        });
    }else{
        await updateDoc(docRef, {
            status: status
        });
    }
    window.location.reload(true);
}