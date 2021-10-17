import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../global-pages.css';
import './style.css';
import api from '../../api'
import { useCookies } from 'react-cookie';
import LoginAndRegisterImage from '../../images/login_register_image.png';
import { BiEnvelope, BiKey } from 'react-icons/bi';

import { useToasts } from 'react-toast-notifications';
import InputForm from '../../components/InputForm/InputForm';
import CriarUsuarioStep1 from '../CriarUsuario/CriarUsuarioStep1';


function Login() {

	const [cookies, setCookie, removeCookie] = useCookies(['volunt3r', 'volunt3r_user']);
	const [userData, setUserData] = useState({
		email: "",
		senha: ""
	});

	let history = useHistory();
	const { addToast } = useToasts();


	function handle(e) {
		const newUserData = { ...userData }
		newUserData[e.target.id] = e.target.value;
		setUserData(newUserData);
		console.log(newUserData)
	}

	async function submitForm(e) {
		e.preventDefault();

		if(userData.email === '' || userData.senha === '') {
			console.log("OPA A MI GÃO PREENCHE Aí")
			addToast('Opa, faltou preencher algo...', {appearance: 'warning', autoDismiss: true})
		} 
		
		else {
			await api.post("/usuarios/login", {
				email: userData.email,
				senha: userData.senha
			}).then((resposta) => {
				setCookie('volunt3r', resposta.data.token.tipo + " " + resposta.data.token.token, { path: '/' });
				setCookie('volunt3r_user', resposta.data.user, { path: "/" });
				history.push("/");
			}).catch((e) => {
				if(e.response.status === 400) {
					addToast('Email e/ou senha inválidos...', {appearance: 'error', autoDismiss: true})
				}
				else if(e.response.status === 404) {
					addToast('Email não cadastrado 😥', {appearance: 'error', autoDismiss: true})
				}
			});
		}

		/* 
		* Aqui estou realizando a destruturação do array newUserData!
		* Isso pode ajudar na hora de enviar o json para a API
		*/
		// const {
		//     email,
		//     senha,  
		// } = userData;


	}

	return (
		<div className="container">
			<div className="content">
				<img src={LoginAndRegisterImage} aria-hidden alt="Login Image" />
			</div>
			<div className="contain-form">
				<div className="information-page">
					<h2 className="title">Olá, bem vindo(a) de volta!</h2>
					<span className="subtitle">Vamos fazer login?</span>
				</div>

				<form onSubmit={(e) => submitForm(e)}>
					<InputForm 
						type="text"
						id="email"
						name="email"
						label="Seu email"
						icon={<BiEnvelope  className="icon-input-group"/>}
						function={(e) => handle(e)}
					/>
					<InputForm 
						type="password"
						id="senha"
						name="senha"
						label="Sua senha"
						icon={<BiKey className="icon-input-group" />}
						function={(e) => handle(e)}
					/>

					<button type="submit" className="btn-new-submit">Entrar</button>
				</form>

				<div className="footer">
					Não tenho uma conta, <Link className="bold" to="/register">quero criar uma!</Link>
				</div>

				<div className="footer2">
					OU
				</div>

				<div className="footer2">
					Esqueci a minha senha, <Link className="bold" to="/recuperar-senha">quero recuperar!</Link>
				</div>

			</div>
		</div>

	);
}

export default Login;