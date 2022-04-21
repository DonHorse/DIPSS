// imports des librairies

import '../style/App.css';
import React, {useEffect, useState} from "react";
import Axios from "axios";

//import {Link} from "react-router-dom";

// fonction d'affichage des séances détaillé par utilisateur

function History() {

    // const [userId, setUserId] = useState(0);
    // const [idTraining, setIdTraining] = useState(0);
    // const [idExercise, setIdExercise] = useState(0);
    const [trainingList, setTrainingList] = useState([]);
    const [exoList, setExoList] = useState([]);
    const [assignList, setAssignList] = useState([]);

    Axios.defaults.withCredentials = true;

    // vérif admin
    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/login").then((response) => {

            if (response.data.loggedIn === true ) {
            }else {
                window.location.href = "/Login";
                window.alert("veuillez vous connecter")
            }
        });
    },[]);

    // requête à l'API GET
    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/training-list/user", {
        }).then((response) => {
            setTrainingList(response.data);
            console.log(trainingList);
        });
    }, [trainingList]);

    const searchExo = (id_training) => {
        Axios.get("http://localhost:3001/DIPSS/exercise-list/training", {
            data :{id_training : id_training}
        }).then((response) => {
            setExoList(response.data);
            console.log(exoList);

        },[]);
    };

    const searchAssign = (idExercise, idTraining) => {
        Axios.get("http://localhost:3001/DIPSS/exercise-assignment-list/exercise-tr", {
            data: {
                idExercise: idExercise,
                idTraining: idTraining,
            }
        }).then((response) => {
            setAssignList(response.data);
        },[]);
    };




    // Gestion de l'affichage
    return(
        <div className="data">
            <h1>Liste de vos séances </h1>

            {trainingList.map((val1) => {

                return(
                    <div className="training">
                        <div className="training-detail">
                            <div>
                                <h2>{val1.title}</h2>
                            </div>
                            <div>
                                <p>Objectif : {val1.objectif}</p>
                            </div>
                            <div>
                                <p>Date: {val1.date}</p>
                            </div>
                        </div>
                        {() => searchExo(val1.id)}
                        <div className="exercise" >

                            {exoList.map((val2) => {
                                return(
                                    <div className="exercice">
                                        <div>
                                            <img width='100px' src={val2.image} alt="img-exo" />;
                                            <h2>{val2.title}</h2>
                                        </div>
                                        <div className="training-content">
                                            <div>
                                                <p>type : </p>{val2.type}
                                            </div>
                                            <div>
                                                <p>Description :  </p>{val2.description}
                                            </div>
                                        </div>
                                        <div>
                                            {() => searchAssign(val2.id, val1.id)}
                                            {assignList.map((val3) => {
                                                return(
                                                    <div className="détail">
                                                        <div>
                                                            <p>Répétition : {val3.repetition_number}</p>
                                                        </div>
                                                        <div>
                                                            <p>Poids : {val3.weight}</p>
                                                        </div>
                                                        <div>
                                                            <p>Resistance : {val3.resistance}</p>
                                                        </div>
                                                        <div>
                                                            <p>Distance : {val3.distance}</p>
                                                        </div>
                                                        <div>
                                                            <p>Durée : {val3.duration}</p>
                                                        </div>
                                                        <div>
                                                            <p>Temps de repos : {val3.rest}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                    </div>
                    )})}
        </div>
    )
}

//export pour routing

export default History;