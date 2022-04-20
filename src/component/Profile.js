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
    // const [lastUpdate, setLastUpdate] = useState('');
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
        Axios.get("http://localhost:3001/DIPSS/profile", {
            data :{userId : userId}
        }).then((response) => {
            setPlaceholderInfo(response.data);
            setGender(response.data[0].gender);
            setBirthday((response.data[0].birthday).substring(0,10));
            setWeight(response.data[0].weight);
            setHeight(response.data[0].height);
            setContraindication(response.data[0].contraindication);
            setNote(response.data[0].note);
            setImg(response.data[0].image);
            // setLastUpdate(((response.data[0].last_update).substring(0,10)) +' '+ (response.data[0].last_update).substring(11,19));

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
            img : img,
            // lastUpdate : lastUpdate,
        }).then(() => {
            alert("modifications enregistrées !");
        }).catch((error) => {
            console.log(error);
        });
    };


    // Affichage du formulaire
    return(
            <div className="mainBodyText">
                <div className="admin-form">
                    <form>
                        <h1>Vos informations</h1>
                        <label>Genre : {PlaceholderInfo.map((val) => { return (val.gender)})}</label>
                        <br/>
                        <label>Date de naissance : {PlaceholderInfo.map((val) => { return (val.birthday).slice(0,10)})}</label>
                        <br/>
                        <label>Poids : {PlaceholderInfo.map((val) => { return (val.weight)})}</label>
                        <br/>
                        <label>Taille : {PlaceholderInfo.map((val) => { return (val.height)})}</label>
                        <br/>
                        <label>Contre-indications : {PlaceholderInfo.map((val) => { return (val.contraindication)})}</label>
                        <br/>
                        <label>Note : {PlaceholderInfo.map((val) => { return (val.note)})}</label>
                        <br/>
                        <label>Dernière mise à jour du profil : {PlaceholderInfo.map((val) => { return (val.last_update).slice(0,10)})}</label>
                    </form>
                </div>
                <br/>
                <div className="admin-form">
                    <form>

                        <label>Modifier vos informations</label>
                        <br/>
                        <p>Genre :</p>
                        <select
                            onChange={(e) => {
                            setGender(e.target.value); }}
                            >
                            <option value ='M'>Homme</option>
                            <option value='F'>Femme</option>
                        </select>
                        <p>Date de naissance :</p>
                        <input
                            type="date"
                            name="birthday"
                            id="birthday"
                            onChange={(e) => {
                                setBirthday(e.target.value);
                            }}/>
                        <p>Poids :</p>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            placeholder= {PlaceholderInfo.map((val) => { return (val.weight)})}
                            onChange={(e) => {
                                setWeight(e.target.value);
                            }}/>
                        <p>Taille :</p>
                        <input
                            type="number"
                            name="height"
                            id="height"
                            placeholder= {PlaceholderInfo.map((val) => { return (val.height)})}
                            onChange={(e) => {
                                setHeight(e.target.value);
                            }}/>
                        <p>Contre-indication :</p>
                        <textarea
                            name="contraindication"
                            id="contraindication"
                            onChange={(e) => {
                                setContraindication(e.target.value);
                            }}/>
                        <p>Note : </p>
                        <textarea
                            name="note"
                            id="note"
                            onChange={(e) => {
                                setNote(e.target.value);
                            }}/>
                        <p>Url de l'image de profil</p>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            onChange={(e) => {
                                setImg(e.target.value);
                            }}/>

                        <button type="submit" onClick={updateProfile}>Valider les modifications</button>

                        <input type="reset"/>
                    </form>
                </div>
            </div>
    )
}

export default Profile;