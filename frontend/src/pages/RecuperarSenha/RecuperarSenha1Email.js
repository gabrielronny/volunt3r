import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style.css';

function NotFound() {

  //fazer ligação com a api
const history =  useHistory();

window.setTimeout(function sair() {
  setTimeout(() => {
    history.push("/login");
  }, 5000);
})

  return(

    <div className="container-notfound">
      <span className="emoji">😉</span>
      <span>Enviamos um e-mail para você!</span>
    </div>
   
  );
}

export default NotFound;