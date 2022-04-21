// imports des librairies

import '../style/App.css';
import React, {useEffect, useState} from "react";
import Axios from "axios";
//import {Link} from "react-router-dom";

// fonction de gestion des utilisateurs

function AssignmentList() {

    const [assignmentList, setAssignmentList] = useState([]);

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

    // requête à l'API GET (renvoie tous les utilisateurs)
    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/assignment-list").then((response) => {
            setAssignmentList(response.data);
        });
    },[assignmentList]);



    // Gestion de l'affichage des assignment
    return(
        <div>
            <h1>Liste des assignments: </h1>

            {assignmentList.map((val) => {
                return(
                    <div className="training">
                        <ul>
                            <li>
                                <div>
                                    <h2>{val.id}</h2>
                                </div>
                                <div>
                                    <p>Répétition : {val.repetition_number}</p>
                                </div>
                                <div>
                                    <p>Poids : {val.weight}</p>
                                </div>
                                <div>
                                    <p>Resistance : {val.resistance}</p>
                                </div>
                                <div>
                                    <p>Distance : {val.distance}</p>
                                </div>
                                <div>
                                    <p>Durée : {val.duration}</p>
                                </div>
                                <div>
                                    <p>Temps de repos : {val.rest}</p>
                                </div>

                            </li>
                        </ul>

                    </div>
                )

            })}

        </div>

    )
}

//export pour routing

export default AssignmentList;