// imports des librairies

import '../style/App.css';
import React, {useEffect, useState} from "react";
import Axios from "axios";
//import {Link} from "react-router-dom";

// fonction de gestion des séances

function TrManage() {

    const [trainingList, setTrainingList] = useState([]);
    const [userSelectedId, setUserSelectedId] = useState(0);
    const [exoSelectedId, setExoSelectedId] = useState(0);


    Axios.defaults.withCredentials = true;

    // vérif admin
    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/login").then((response) => {
            if (response.data.loggedIn === true && response.data.user[0].role === 1) {

            }else {
                window.location.href = "/Login";
                window.alert("veuillez vous connecter à un compte admin")
            }
        });
    }, []);

    // requête à l'API GET (renvoie tous les séances)
    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/training-list").then((response) => {
            setTrainingList(response.data);
        });
    },[trainingList]);

    // fonctions pour gestion des séances

    const trainingToUser = (id_training, id_user) => {
        Axios.put("http://localhost:3001/DIPSS/training/assign/user", {
            id_training : id_training,
            id_user : id_user,
        }).then((response) => {
            window.alert(response);
        });
    };

    const trainingValidation = (id_training) => {
        Axios.put("http://localhost:3001/DIPSS/training/validation", {
            id_training : id_training,
        }).then((response) => {
            window.alert(response);
        });
    };

    const exoToTraining = (id_training, id_exercise) => {
        Axios.post("http://localhost:3001/DIPSS/training/assign/exercise", {
            id_training : id_training,
            id_exercise : id_exercise,
        }).then((response) => {
            window.alert(response);
        });
    };

    // Gestion de l'affichage des séances
    return(
        <div>
            <h1>Gestion des séances : </h1>

            {trainingList.map((val) => {
                return(
                    <div className="training">
                        <div>
                            <h2>{val.title}</h2>
                        </div>
                        <div className="training-content">
                            <div>
                                <p>Objetif : </p>{val.objectif}
                            </div>
                            <div>
                                <p>Assigné à </p>{val.id_user}
                            </div>
                            <div>
                                <p>Pour le </p>{(val.date)}
                            </div>
                            <div>
                                <p>Durée : </p>{(val.duration)}
                            </div>
                            <div>
                                <p>Validation : </p>{(val.validation)}
                            </div>
                            <div>
                                {(val.note)}
                            </div>

                        </div>
                        <div className="actions">
                            <button onClick={() => trainingValidation(val.id)}> Valider </button>
                            <br/>
                            <div>
                                <br/>
                                <input
                                    placeholder="id de l'utilisateur"
                                    type="number"
                                    name="user-selected"
                                    id="user-selected"
                                    onChange={(e) => {
                                        setUserSelectedId(e.target.value);
                                    }}/>
                                <button  onClick={() => trainingToUser(val.id, userSelectedId)}> Assigner Utilisateur</button>
                            </div>
                            <br/>
                            <div>
                                <input
                                    placeholder="id de l'exercice"
                                    type="number"
                                    name="exo-selected"
                                    id="exo-selected"
                                    onChange={(e) => {
                                        setExoSelectedId(e.target.value);
                                    }}/>
                                <button onClick={() => exoToTraining(val.id, exoSelectedId)}>Assigner exercice</button>
                            </div>


                        </div>
                    </div>
                )

            })}

        </div>

    );
}

//export pour routing

export default TrManage;