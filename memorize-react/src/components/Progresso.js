import React, { Component } from "react";
import Cadeado from "../assets/icons/lock-icon.png";
import Trofeu from "../assets/icons/trophy-icon.png";
import Anime from "@mollycule/react-anime";


export default class Progresso extends Component {
    constructor(props) {
        super(props);
        this.refFaseAtual = React.createRef();
    }

    componentDidMount(){
        if (this.refFaseAtual !== null || this.refFaseAtual !== undefined){
            // console.log(this.refFaseAtual.current.getBoundingClientRect().y);
        }
    }


    render() {

        const array = [];
        let alturaSeta = 0;

        for (let i = 0; i < 6; i++) {
            const element = i;

            if (element > this.props.fase - 1) {
                array.push("bloqueada");
            } else if (element === this.props.fase - 1) {
                alturaSeta = i + 1;
                array.push("atual");
            } else if (element < this.props.fase - 1) {
                array.push("desbloqueada");
            }
        }

        return (
            <div className="Progresso">
                <ul className="fases">
                    {array.map((item, i) => {


                        /// verifica que tipo de fase criar de acordo com o progresso
                        if (i === 5 && item === "bloqueada") {
                            return (
                                <li className="fase-group">
                                    <div className="fase fase-bloqueada fase-final fase-final-bloqueada"></div>
                                </li>
                            )
                        } else if (i === 5 && item === "atual" || i === 5 && item === "desbloqueada") {
                            return (
                                <li className="fase-group">
                                    <div className="fase fase-atual fase-final"></div>
                                </li>
                            )

                        } else if (item === "bloqueada") {
                            return (
                                <li className="fase-group">
                                    <span className="linha-progresso linha-bloqueada"></span>
                                    <div className="fase fase-bloqueada"></div>
                                </li>
                            )
                        } else if (item === "desbloqueada") {
                            return (
                                <li className="fase-group">
                                    <span className="linha-progresso"></span>
                                    <div className="fase"></div>
                                </li>
                            )
                        } else if (item === "atual") {
                            return (
                                <li className="fase-group">
                                    <span className="linha-progresso linha-atual"></span>
                                    <Anime
                                    in appear
                                    loop={true}
                                    easing= "linear"
                                    // delay={500}
                                    onEntering={{ backgroundColor: ["#4c3cb4", "#999"], duration: 1000 }}
                                    >
                                    <div className="fase fase-atual" ref={this.refFaseAtual}></div>
                                    </ Anime>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>
            
        )

    }
}