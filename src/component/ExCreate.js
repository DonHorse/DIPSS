import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";

function ExCreate() {

    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");


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

    const createExercise = () => {
        Axios.post("http://localhost:3001/DIPSS/exercise/create", {
            title : title,
            type : type,
            image : image,
            description : description,
        }).then((response) => {
            window.alert(response);
        });
    };


    return (

        <div className="contact-form">

            <div className="admin-form">
                <button><Link to="/assignment-creation">Créer un assignement</Link></button>
                <button><Link to="/training-creation">Créer une séance</Link></button>
            </div>

            <form>
                <br/>
                <h1>Création d'exercice</h1>

                <label> Titre de l'exercice </label>
                <input
                    placeholder="ex : Dips banc "
                    type="text"
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <br/>

                <label> Type d'exercice </label>
                <input
                    placeholder="ex : Cardio "
                    type="text"
                    onChange={(e) => {
                        setType(e.target.value);
                    }}
                />
                <br/>

                <label> URL de l'image </label>
                <input
                    placeholder="ex : Dips banc "
                    type="text"
                    onChange={(e) => {
                        setImage(e.target.value);
                    }}
                />
                <br/>

                <label> Description </label>
                <input
                    placeholder="enter your text "
                    type="textarea"
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <br/>

                <button onClick={createExercise}> Ajouter ! </button>

            </form>
            <br/>


        </div>


    );
}

//export pour routing

export default ExCreate;