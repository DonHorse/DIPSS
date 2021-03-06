// Bandeau menu supérieur
// imports des librairies
import '../style/Header.css'
import { NavLink } from 'react-router-dom';
import logo from '../img/Icone.ico';
import Axios from "axios";//axios est une bibliothèque JS fonctionnant comme un client http, elle permet de communiquer avec des API avec des requêtes
import React, {useEffect, useState} from "react";

// fonction contenant le header
function Header(){

    const [loginStat, setLoginStat] = useState(false);

    // requête à l'API GET (Gestion du statut Login ou logout)
    Axios.defaults.withCredentials = true;

    const Logout = () => {

        Axios.get("http://localhost:3001/DIPSS/logout").then((response) => {
            if (response) {
                setLoginStat(false);
                console.log("logout");
                window.location = "/login";

            }
        });
    };

    useEffect(() => {
        Axios.get("http://localhost:3001/DIPSS/login").then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStat(true);
            } else{
                setLoginStat(false);
            }
        });
    });


    // Affichage des Navlink => App.js contient la gestion de ces Navlink = lien avec routing
    return(
        <div className="header">

            <nav>

                <div className="menuANDuser">
                    <div className="menu">

                        <ul className="menu-list">
                            <img className="logo" src={logo} alt="logo"/>

                            <div className="submenu">
                                <button className="submenubtn">Espace Coach <i className="fa fa-caret-down"></i></button>
                                <div className="submenu-content">
                                    <NavLink  activeclassname="current" end to="/user-management">
                                        <li >Gestion utilisateurs</li>
                                    </NavLink>
                                    <NavLink  activeclassname="current" end to="/training-management">
                                        <li >Gestions séances</li>
                                    </NavLink>
                                    <NavLink  activeclassname="current" end to="/training-creation">
                                        <li >Création de séances</li>
                                    </NavLink>
                                    <NavLink  activeclassname="current" end to="/exercise-management">
                                        <li >Gestion exercises</li>
                                    </NavLink>
                                    <NavLink  activeclassname="current" end to="/assignment-management">
                                        <li >Gestion Assignments </li>
                                    </NavLink>
                                </div>
                            </div>
                            <div className="submenu">
                                <button className="submenubtn">Espace client <i className="fa fa-caret-down"></i></button>
                                <div className="submenu-content">
                                    <NavLink  activeclassname="current" end to="/profile">
                                        <li >Profil</li>
                                    </NavLink>
                                    <NavLink  activeclassname="current" end to="/historique">
                                        <li >Historique des séances</li>
                                    </NavLink>
                                </div>
                            </div>
                        </ul>
                    </div>

                    <div className="user-gestion">
                        <ul className="user-gestion-list">
                            {loginStat === false && (
                                <NavLink  activeclassname="current" end to="/Login">
                                    <li >Login</li>
                                </NavLink>
                            )}
                            {loginStat === true && (
                                <button onClick={Logout}>Logout</button>
                            )}
                            <NavLink  activeclassname="current" end to="/Register">
                                <li >Register</li>
                            </NavLink>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    )
}
//export pour routing
export default Header;