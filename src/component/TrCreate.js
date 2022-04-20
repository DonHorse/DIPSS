import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

function TrCreate() {

    const [title, setTitle] = useState("");
    const [objectif, setObjectif] = useState("");
    const [date, setDate] = useState("");
    const [duration, setDuration] = useState(60);
    const [note, setNote] = useState("");


    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/login").then((response) => {
            if (response.data.loggedIn === true && response.data.user[0].role === 1) {

            }else {
                window.location.href = "/Login";
                window.alert("veuillez vous connecter à un compte admin")
            }
        });
    }, []);

    const createTraining = () => {
        Axios.post("http://localhost:3001/DIPSS/training/create", {
            title : title,
            objectif : objectif,
            date : date,
            duration : duration,
            note : note,
        }).then((response) => {
            window.alert("Enregistré !");
        });
    };


    return (
        <div className="contact-form">
            <br/>

            <div className="admin-form">
                <button><Link to="/exercise-creation">Créer un exercice</Link></button>
                <button><Link to="/assignment-creation">Créer un assignment</Link></button>
            </div>


            <br/>
            <form>
                <br/>
                <h1>Création de séance</h1>

                <label> Titre de la séance </label>
                <input
                    placeholder="ex : Renfo 1  "
                    type="text"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <br/>

                <label> Objectif de la séance </label>
                <input
                    placeholder="ex : Renforcement musculaire bas du corps "
                    type="text"
                    onChange={(e) => {
                        setObjectif(e.target.value);
                    }}
                />
                <br/>

                <label> Date et heure prévue </label>
                <input
                    type="datetime-local"
                    onChange={(e) => {
                        setDate(e.target.value);
                    }}
                />
                <br/>

                <label> Durée de la séance (en minutes) </label>
                <input
                    placeholder="60"
                    type="number"
                    onChange={(e) => {
                        setDuration(e.target.value);
                    }}
                />
                <br/>

                <label> Note de séance </label>
                <input
                    placeholder="entrer un text..."
                    type="textarea"
                    onChange={(e) => {
                        setNote(e.target.value);
                    }}
                />
                <br/>

                <button onClick={createTraining}> Ajouter ! </button>

            </form>
            <br/>


        </div>


    );
}

//export pour routing

export default TrCreate;