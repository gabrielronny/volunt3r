import React from 'react';

import "./button-style.css";

const Botao = props => {
  //criar set de tamanhos e os caraio pra ficar show de bola :)
    return (
        <button className = "button">{props.action}</button>
    );
}

export default Botao;