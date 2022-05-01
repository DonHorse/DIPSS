// imports des librairies

import '../style/App.css';
import React, {useEffect, useState} from "react";
import Axios from "axios";


//import {Link} from "react-router-dom";

// fonction d'affichage des séances détaillé par utilisateur

function History() {

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

        });
    }, []);

    const listex = (id_tr) => {
        Axios.post("http://localhost:3001/DIPSS/exercise-list/training", {
            id_tr : id_tr,
        }).then((response) => {
            setExoList(response.data);
            console.log(exoList);

        },[]);
    };
    const listassign = (id_tr, id_ex) => {
        Axios.post("http://localhost:3001/DIPSS/exercise-assignment-list/exercise-tr", {
                id_tr : id_tr,
                id_ex : id_ex,
        }).then((response) => {
            console.log(id_tr, id_ex);
            setAssignList(response.data);
            console.log(assignList);
        },[]);
    };



    // Gestion de l'affichage
    return(
        <div className="data">
            <h1>Liste de vos séances </h1>

            {trainingList.map((val1) => {

                return(
                    <div className="training-container">
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
                        <div className="exercises-detail">
                            <h3>Liste des exercicses pour {val1.title} </h3>
                            <button onClick={() => {listex(val1.id)}}>Afficher exercices</button>
                            {exoList.map((val) => {
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
                                        <div className="assignments-detail">
                                            <h3>Liste des exercicses pour {val1.title} </h3>
                                            <button onClick={() => {listassign(val1.id,val.id)}}>Afficher assignement</button>

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

                                )})}
                        </div>

                    </div>
                    )})}
        </div>
    )
}

//export pour routing

export default History;