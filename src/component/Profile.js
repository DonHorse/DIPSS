// pied de page avec information modifiable par l'admin

// imports des librairies

import '../style/App.css'
import {useEffect, useState} from "react";
import Axios from "axios";
import React from "react";


// fonction du pied de page

function Profile() {

    const [userId, setUserId] = useState(0);
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [contraindication, setContraindication] = useState('');
    const [note, setNote] = useState('');
    //const [trNumber, setTrNumber] = useState(0);
    const [img, setImg] = useState('');
    //const [lastUpdate, setLastUpdate] = useState('');
    const [PlaceholderInfo, setPlaceholderInfo ] = useState([]);

    Axios.defaults.withCredentials = true;

// requête à l'API GET (info si connexion) ressort l'id
    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/login").then((response) => {
            if (response.data.loggedIn === true) {
                setUserId(response.data.user[0].id);
                console.log(userId);
            }else {
                window.location.href = "/Login";
            }
        });
    }, [userId]);
    // requête à l'API POST (GET des messages en placeholder et UPDATE une fois validé )

    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/profile",{
            userId : userId
        }).then((response) => {
            setPlaceholderInfo(response.data);
            console.log(response.data);
        })
    },[userId]);

    const updateProfile = () => {
        Axios.put('http://localhost:3001/DIPSS/profile/update', {
            userId : userId,
            gender : gender,
            birthday : birthday,
            weight : weight,
            height : height,
            contraindication : contraindication,
            note : note,
            img : img
        }).then(() => {
            alert("modifications enregistrées !");
        }).catch((error) => {
            console.log(error);
        });
    };



    // Affichage du formulaire
    return(
        <div className="admin-form">
            <form>
                <label htmlFor="title">Titre de page : </label>

                <label>Genre :</label>
                <select
                    placeholder= {PlaceholderInfo.map((val) => { return (val.gender)})}
                    onChange={(e) => {
                    setGender(e.target.value); }}>
                    <option value='M'>Homme</option>
                    <option value='F'>Femme</option>
                </select>

                <input
                    type="date"
                    name="birthday"
                    id="birthday"
                    placeholder= {PlaceholderInfo.map((val) => { return (val.birthday)})}
                    onChange={(e) => {
                        setBirthday(e.target.value);
                    }}/>
                <input
                    type="number"
                    name="weight"
                    id="weight"
                    placeholder= {PlaceholderInfo.map((val) => { return (val.weight)})}
                    onChange={(e) => {
                        setWeight(e.target.value);
                    }}/>
                <input
                    type="number"
                    name="height"
                    id="height"
                    placeholder= {PlaceholderInfo.map((val) => { return (val.height)})}
                    onChange={(e) => {
                        setHeight(e.target.value);
                    }}/>
                <label htmlFor="text">Contre-indication(s) : </label>
                <textarea
                    name="contraindication"
                    id="contraindication"
                    placeholder={PlaceholderInfo.map((val) => { return (val.contraindication)})}
                    onChange={(e) => {
                        setContraindication(e.target.value);
                    }}/>
                <label htmlFor="text">Notes divers: </label>
                <textarea
                    name="note"
                    id="note"
                    placeholder={PlaceholderInfo.map((val) => { return (val.note)})}
                    onChange={(e) => {
                        setNote(e.target.value);
                    }}/>
                <input
                    type="text"
                    name="image"
                    id="image"
                    placeholder= {PlaceholderInfo.map((val) => { return (val.img)})}
                    onChange={(e) => {
                        setImg(e.target.value);
                    }}/>

                <button type="submit" onClick={updateProfile}>Valider les modifications</button>

                <input type="reset"/>
            </form>
        </div>
    )
}

export default Profile;