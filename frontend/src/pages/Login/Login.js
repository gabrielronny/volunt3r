import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        senha: ""
    });


    function handle(e) {
        const newUserData = {...userData }
        newUserData[e.target.id] = e.target.value;
        setUserData(newUserData);
    }

    function submitForm(e) {
        e.preventDefault();
        
        /* 
        * Aqui estou realizando a destruturação do array newUserData!
        * Isso pode ajudar na hora de enviar o json para a API
        */
        const {
            email,
            senha,  
        } = userData;


    }

    return (
        <div className="container-page">
            <div className="references-voluntier">
                <h2 className="title">Volunt3r</h2>
                <span>
                    Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Natus ut nulla e
                    xercitationem, incidunt commodi necessitatibus!
                    Aperiam molestias non suscipit quibusdam, pariatur eius aspernatur minus dolore, beatae at veritatis ducimus assumenda.
                
                </span>
                <button className="btn">saiba mais!</button>
            </div>
            <div className="form-container">
                <form onSubmit={(e) => submitForm(e)}>
                    <fieldset>
                        <legend>Olá, você voltou!</legend>
                        <div className="input-group">
                            <label htmlFor="">
                                Seu email
                                <input className="input" type="email" name="email" id="email" onChange={(e) => handle(e)} />
                            </label>
                        </div>
                        <div className="input-group">
                            <label htmlFor="">
                                Sua senha
                                <input className="input" type="password" name="senha" id="senha" onChange={(e) => handle(e)} />
                            </label>
                        </div>
                        
                        <button className="btn-submit">Continuar</button>
                    </fieldset>
                </form>
            </div>
        </div>

    );
}

export default Login;