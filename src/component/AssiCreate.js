// imports des librairies

import '../style/App.css'
import React, {useState,useEffect} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";



// fonction du pied de page

function AssiCreate() {

    const [repetitionNumber, setRepetitonNumber] = useState(0);
    const [weight, setWeight] = useState(0);
    const [resistance, setResistance] = useState(0);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState("");
    const [rest, setRest] = useState("");
    const [idTraining, setIdTraining] = useState("");


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

    const createAssignement = () => {
        Axios.post("http://localhost:3001/DIPSS/assignement/create", {
            repetitionNumber : repetitionNumber,
            weight : weight,
            resistance : resistance,
            distance : distance,
            duration : duration,
            rest : rest,
            idTraining : idTraining,

        }).then((response) => {

            window.alert(response);
        });
    };


    return (

        <div className="contact-form">
            <div className="admin-form">
                <button><Link to="/exercise-creation">Créer un exercice</Link></button>
                <button><Link to="/training-creation">Créer une séance</Link></button>
            </div>

            <form>
                <br/>
                <h1>Création d'assignement d'exercice</h1>

                <label> Nombre de répétition </label>
                <input
                    placeholder="ex : 12"
                    type="number"
                    onChange={(e) => {
                        setRepetitonNumber(e.target.value);
                    }}
                />
                <br/>

                <label> Poids (en kg) </label>
                <input
                    placeholder="ex : 10 "
                    type="number"
                    onChange={(e) => {
                        setWeight(e.target.value);
                    }}
                />
                <br/>

                <label> Résistance </label>
                <input
                    placeholder="ex : 3 "
                    type="number"
                    onChange={(e) => {
                        setResistance(e.target.value);
                    }}
                />
                <br/>

                <label> Distance (en mètre) </label>
                <input
                    placeholder="ex : 1000 "
                    type="number"
                    onChange={(e) => {
                        setDistance(e.target.value);
                    }}
                />
                <br/>

                <label> Durée  </label>
                <input
                    type="time"
                    onChange={(e) => {
                        setDuration(e.target.value);
                    }}
                />
                <br/>

                <label> Temps de repos entre les répétition </label>
                <input
                    type="time"
                    onChange={(e) => {
                        setRest(e.target.value);
                    }}
                />
                <br/>

                <label> id séance</label>
                <input
                    type="number"
                    onChange={(e) => {
                        setIdTraining(e.target.value);
                    }}
                />
                <br/>


                <button onClick={createAssignement}> Ajouter ! </button>

            </form>
            <br/>


        </div>


    );
}

//export pour routing

export default AssiCreate;