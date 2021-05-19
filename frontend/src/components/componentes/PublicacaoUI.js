import React from 'react';
<<<<<<< HEAD:frontend/src/components/componentes/PublicacaoUI.js
import Botao from './BotaoUI.js';
import "../css/publicacao-style.css";
=======
import Botao from '..components/Botao.js';
import "../styles/publicacao-style.css";
>>>>>>> 041c6d79843733efa692291f48b6aaa54f855a57:frontend/src/components/PublicacaoUI.js

const Publicacao = props => {
    return (
        <div className="publicacao text-center shadow">
            <div className="publicacao-main">
                <div className="publicacao-info">
                    <div className="user-img">
                        <img src={props.imgIconUser} className="user-img"></img></div>
                    <div className="publicacao-owner"> {props.userName} </div>
                    <div className="publicacao-time text-secondary"> {props.time} </div>
                    <div className="publicacao-actions">
                        <div className="publicacao-icons">
                            <img src={props.imgIconLike} className="publicacao-icon"></img>
                            <img src={props.imgIconComment} className="publicacao-icon"></img>
                        </div>
                        <div className="publicacao-icons">
                            <div className="publicacao-tags publicacao-statistic">{props.likes}</div>
                            <div className="publicacao-tags publicacao-statistic">{props.comments}</div>
                        </div>
                    </div>
                </div>
                <div className="publicacao-content">
                        <img src={props.imgsrc} className="publicacao-img"></img>
                    <div className="publicacao-text text-secondary">
                        <div className="publicacao-desc">{props.desc}</div>
                        <div className="publicacao-tags">{props.tags}</div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Publicacao;