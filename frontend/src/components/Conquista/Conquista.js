import React, { useEffect } from 'react';
import './conquista-style.css';


const URL = "http://voluntier.eastus.cloudapp.azure.com:81";


const Conquista = (props) => {
    return (
        <div className="medal-info-container">
            <span className="tooltip-categoria">{props.categoria}</span>
            <div className={ props.show === "icone"? "medal-only-icon":"medal-icon"}>
                <img src={props.icone}></img>
            </div>
            {
                (() => {
                    const porcProgresso = (props.progressoAtingido*100)/props.progressoMaximo;

                    const checkProgress = porcProgresso < 50 ? "progresso-abaixo-media" : "progresso-acima-media";

                    if (props.show != "icone") {
                        return (
                            <div className="medal-progress">
                                <div className="progress-statistics">
                                    <span className="current-progress">{props.progressoAtingido}</span>
                                    <span>/</span>
                                    <span className="total-progress">{props.progressoMaximo}</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="total-progress-bar">
                                        <div className={`current-progress-bar ${checkProgress}`} style={{width: porcProgresso+'%'}}></div>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })()}

        </div>
    );
}



export default Conquista;