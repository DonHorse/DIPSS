// imports des librairies

import '../style/App.css';
import React, {useEffect, useState} from "react";
import Axios from "axios";
//import {Link} from "react-router-dom";

// fonction de gestion des exos

function ExManage() {

    const [exerciseList, setexerciseList] = useState([]);
    const [assignmentSelectedId, setassignmentSelectedId] = useState(0);


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

    // requête à l'API GET (renvoie tous les exos)
    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/exercise-list").then((response) => {
            setexerciseList(response.data);
        });
    },[exerciseList]);

    // fonctions pour gestion des exos

    const assignmentToExercise = (id_exercise, id_assignment) => {
        Axios.post("http://localhost:3001/DIPSS/exercise/assign/exerciseAssignment", {
            id_exercise : id_exercise,
            id_assignment : id_assignment,
        }).then((response) => {
            window.alert(response);
        });
    };


    // Gestion de l'affichage des exos
    return(
        <div>
            <h1>Gestion des Exercices : </h1>

            {exerciseList.map((val) => {
                return(
                    <div className="training">
                        <div>
                            <img width='100px' src={val.image} alt="img-exo" />;
                            <h2>{val.id}</h2>
                            <h2>{val.title}</h2>
                        </div>
                        <div className="training-content">
                            <div>
                                <p>type : </p>{val.type}
                            </div>
                            <div>
                                <p>Description :  </p>{val.description}
                            </div>


                        </div>
                        <div className="actions">
                            <input
                                placeholder="id de l'assignment"
                                type="number"
                                name="user-selected"
                                id="user-selected"
                                onChange={(e) => {
                                    setassignmentSelectedId(e.target.value);
                                }}/>
                            <button  onClick={() => assignmentToExercise(val.id, assignmentSelectedId)}> Ajouter assignment</button>
                        </div>
                    </div>
                )

            })}

        </div>

    );
}

//export pour routing

export default ExManage;