import React, { Component } from "react";
import Cadeado from "../assets/icons/lock-icon.png";
import Trofeu from "../assets/icons/trophy-icon.png";

export default class Progresso extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const array = [];

        for (let i = 0; i < 6; i++) {
            const element = i;

            if (element > this.props.fase - 1) {
                array.push("bloqueada");
            } else if (element === this.props.fase - 1) {
                array.push("atual");
            } else if (element < this.props.fase - 1) {
                array.push("desbloqueada");
            }
        }

        console.log(array);


        return (
            <div className="Progresso">
                <ul className="fases">
                    {array.map((item, i) => {


                        /// verifica que tipo de fase criar de acordo com o progresso
                        if (i === 5 && item === "bloqueada") {
                            return (
                                <li>
                                    <div className="fase fase-bloqueada fase-final"></div>
                                </li>
                            )
                        } else if (i === 5 && item === "atual" || i === 5 && item === "desbloqueada") {
                            return (
                                <li>
                                    <div className="fase fase-atual fase-final"></div>
                                </li>
                            )

                        } else if (item === "bloqueada") {
                            return (
                                <li>
                                    <span className="linha-progresso linha-bloqueada"></span>
                                    <div className="fase fase-bloqueada"></div>
                                </li>
                            )
                        } else if (item === "desbloqueada") {
                            return (
                                <li>
                                    <span className="linha-progresso"></span>
                                    <div className="fase"></div>
                                </li>
                            )
                        } else if (item === "atual") {
                            return (
                                <li>
                                    <span className="linha-progresso linha-atual"></span>
                                    <div className="fase fase-atual"></div>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
            
        )

    }
}