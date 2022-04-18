import React, { useState } from "react";
import Axios from "axios";
import "../style/App.css";
import {Link} from "react-router-dom";

//export pour routing
export default function Registration() {
    const [firstnameReg, setFirstnameReg] = useState("");
    const [lastnameReg, setLastnameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [roleReg, setRoleReg] = useState(2);
    const [passwordReg, setPasswordReg] = useState("");

    Axios.defaults.withCredentials = true;

    const register = () => {
        Axios.post("http://localhost:3001/DIPSS/register", {
            firstname: firstnameReg,
            lastname : lastnameReg,
            email: emailReg,
            password: passwordReg,
            role : roleReg,
        }).then((response) => {
            window.alert(response);
        });
    };


    return (

        <div className="registration-form">
            <form>
                <h1>S'enregistrer</h1>
                <input
                    placeholder="Prénom"
                    type="text"
                    onChange={(e) => {
                        setFirstnameReg(e.target.value);
                    }}
                />
                <input
                    placeholder="Nom"
                    type="text"
                    onChange={(e) => {
                        setLastnameReg(e.target.value);
                    }}
                />
                <input
                    placeholder="email : xyz@mail.ex"
                    type="email"
                    onChange={(e) => {
                        setEmailReg(e.target.value);
                    }}
                />

                <label>Type d'utilisateur :</label>
                <select onChange={(e) => {
                    setRoleReg(parseInt(e.target.value)); }}>
                    <option value={2}>Utilisateur</option>
                </select>


                <input
                    placeholder="Mot de passe"
                    type="password"
                    onChange={(e ) => {
                        setPasswordReg(e.target.value);
                    }}
                />
                <button  onClick={register}> Register </button>

            </form>
            <br/>
            <span>Déjà enregistré ? <Link to="/Login">Se connecter</Link></span>

        </div>


    );
}



// rajouté anti bot CAPTCHA
