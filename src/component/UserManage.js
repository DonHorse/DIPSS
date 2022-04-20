// imports des librairies

import '../style/App.css';
import React, {useEffect, useState} from "react";
import Axios from "axios";
//import {Link} from "react-router-dom";

// fonction de gestion des utilisateurs

function UserManage() {

    const [userList, setUserList] = useState([]);

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
        Axios.get("http://localhost:3001/DIPSS/user-list").then((response) => {
            setUserList(response.data);
        });
    },[userList]);



    // Gestion de l'affichage des utilisateurs
    return(
        <div>
            <h1>Liste des utilisateurs: </h1>

            {userList.map((val) => {
                return(
                    <div className="training">
                        <ul>
                            <li>
                                <div>
                                    <h2>{val.id}</h2>
                                </div>
                                <div>
                                    <p>Nom : {val.last_name}</p>
                                </div>
                                <div>
                                    <p>Prénom : {val.first_name}</p>
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

export default UserManage;