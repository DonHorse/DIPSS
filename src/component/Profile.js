// pied de page avec information modifiable par l'admin

// imports des librairies

import '../style/App.css'
import {useEffect, useState} from "react";
import Axios from "axios";


// fonction du pied de page

function Profile() {

    const [userId, setUserId] = useState(0);
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [contraindication, setContraindication] = useState('');
    const [note, setNote] = useState('');
    const [trNumber, setTrNumber] = useState(0);
    const [img, setImg] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [PlaceholderInfo, setPlaceholderInfo ] = useState('');

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
    });
    // requête à l'API POST (GET des messages en placeholder et UPDATE une fois validé )

    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/profile/:").then((response) => {
            setPlaceholderInfo(response.data);
            console.log(response.data);
        });
    });

    // const addAdminModifTitle = () => {
    //     Axios.put('http://localhost:3001/api/homeModif/title', {
    //         bodyTitle : bodyTitle,
    //     }).then(() => {
    //         alert("modifications enregistrées !");
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };
    //
    // const addAdminModifBody1 = () => {
    //     Axios.put('http://localhost:3001/api/homeModif/body1', {
    //         body1 : body1
    //     }).then(() => {
    //         alert("modifications enregistrées !");
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };
    //
    // const addAdminModifFooter1 = () => {
    //     Axios.put('http://localhost:3001/api/homeModif/footer1', {
    //         footer1 : footer1
    //     }).then(() => {
    //         alert("modifications enregistrées !");
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };
    //
    // const addAdminModifFooter2 = () => {
    //     Axios.put('http://localhost:3001/api/homeModif/footer2', {
    //         footer2 : footer2
    //     }).then(() => {
    //         alert("modifications enregistrées !");
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };
    //
    // const addAdminModifFooter3 = () => {
    //     Axios.put('http://localhost:3001/api/homeModif/footer3', {
    //         footer3 : footer3
    //     }).then(() => {
    //         alert("modifications enregistrées !");
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // };


    // Affichage du formulaire
    // return(
    //     <div className="admin-form">
    //         <form>
    //             <label htmlFor="title">Titre de page : </label>
    //             <input
    //                 type="text"
    //                 name="bodyTitle"
    //                 id="bodyTitle"
    //                 placeholder= {PlaceholderInfo.map((val) => { return (val.bodyTitle)})}
    //                 onChange={(e) => {
    //                     setBodyTitle(e.target.value);
    //                 }}/>
    //             <button type="submit" onClick={addAdminModifTitle}>Valider les modifications</button>
    //
    //             <label htmlFor="text">Message d'accueil : </label>
    //             <textarea
    //                 name="body1"
    //                 id="body1"
    //                 placeholder= {PlaceholderInfo.map((val) => { return (val.body1)})}
    //                 onChange={(e) => {
    //                     setBody1(e.target.value);
    //                 }}
    //             />
    //             <button type="submit" onClick={addAdminModifBody1}>Valider les modifications</button>
    //
    //             <label htmlFor="text">Pied de page gauche : </label>
    //             <textarea
    //                 name="footer1"
    //                 id="footer1"
    //                 placeholder= {PlaceholderInfo.map((val) => { return (val.footer1)})}
    //                 onChange={(e) => {
    //                     setFooter1(e.target.value);
    //                 }}/>
    //             <button type="submit" onClick={addAdminModifFooter1}>Valider les modifications</button>
    //
    //             <label htmlFor="text">Pied de page centre : </label>
    //             <textarea
    //                 name="footer2"
    //                 id="footer2"
    //                 placeholder={PlaceholderInfo.map((val) => { return (val.footer2)})}
    //                 onChange={(e) => {
    //                     setFooter2(e.target.value);
    //                 }}/>
    //             <button type="submit" onClick={addAdminModifFooter2}>Valider les modifications</button>
    //
    //             <label htmlFor="text">Pied de page droite : </label>
    //             <textarea
    //                 name="footer3"
    //                 id="footer3"
    //                 placeholder= {PlaceholderInfo.map((val) => { return (val.footer3)})}
    //                 onChange={(e) => {
    //                     setFooter3(e.target.value);
    //                 }}/>
    //             <button type="submit" onClick={addAdminModifFooter3}>Valider les modifications</button>
    //
    //             <input type="reset"/>
    //         </form>
    //     </div>
    // )
}

export default Profile;