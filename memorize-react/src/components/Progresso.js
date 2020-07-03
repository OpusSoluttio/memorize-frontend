import React, { Component } from "react";
import Anime from "@mollycule/react-anime";
import ReactTooltip from "react-tooltip";
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import fases from '../modalFases.js';


export default class Progresso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: '',
            faseModal : "",
        }
    }

    onOpenModal = (fase) => {
        let faseBuscada = fases.modalFases.find(item => item.faseModal === fase);
        
        this.setState({
            open : true,
            faseModal : faseBuscada.faseModal,
            texto : faseBuscada.texto,
        })
    };

    onCloseModal = () => {
        this.setState({  open : false});

        setTimeout(() => {
            this.setState({texto : "", faseModal : ""})
        }, 250); 
    }


    componentDidUpdate(prevProps) {
        if (prevProps.fase !== this.props.fase && prevProps.fase !== null && prevProps.fase !== undefined)  {

            //fase atual menos uma (mostra a ultima desbloqueada)
            let faseBuscada = fases.modalFases.find(item => item.faseModal === this.props.fase - 1);

            if (faseBuscada !== null && faseBuscada !== undefined) {
                this.setState({
                    open: true,
                    faseModal: this.props.fase - 1,
                    texto: faseBuscada.texto,
                })
            }
        }
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

        return (
            <div className="Progresso">
                <ReactTooltip 
                id="fase-tooltip"
                place="right"
                type="dark"
                effect="solid"
                multiline={true}
                delayShow={0.5}
                delayHide={0.5} />


                <ul className="fases">
                    {array.map((item, i) => {


                        /// verifica que tipo de fase criar de acordo com o progresso
                        if (i === 5 && item === "bloqueada") {
                            return (
                                <li className="fase-group" key={i+1}>
                                    <div className="fase fase-bloqueada fase-final fase-final-bloqueada"
                                        data-for="fase-tooltip"
                                        data-tip="Você ainda não desbloqueou essa fase :/"
                                    ></div>
                                </li>
                            )
                        } else if (i === 5 && item === "atual") {
                            return (
                                <li className="fase-group" key={i+1}>
                                    <Anime
                                        in appear
                                        loop={true}
                                        easing="linear"
                                        // delay={500}
                                        onEntering={{ backgroundColor: ["#4c3cb4", "#999"], duration: 1000 }}
                                    >
                                        <div className="fase fase-atual fase-final"
                                        data-for="fase-tooltip"
                                        data-tip="Você está aqui"
                                        >
                                        </div>
                                    </Anime>
                                </li>
                            )

                        } else if (i >= 5 && item === "desbloqueada") {
                            return (
                                <li className="fase-group" key={i+1}>
                                    <div className="fase fase-atual fase-final"
                                        data-for="fase-tooltip"
                                        data-tip={"Parabéns! Você venceu!"}
                                        >
                                    </div>
                                </li>
                            )
                        } else if (item === "bloqueada") {
                            return (
                                <li className="fase-group" key={i+1}>
                                    <span className="linha-progresso linha-bloqueada"></span>
                                    <div 
                                    className="fase fase-bloqueada"
                                    data-for="fase-tooltip"
                                    data-tip="Você ainda não desbloqueou essa fase :/"
                                    >

                                    </div>
                                </li>
                            )
                        } else if (item === "desbloqueada") {
                            return (
                                    <li className="fase-group" key={i+1}>
                                        <span className="linha-progresso"></span>
                                        <div className="fase"
                                            onClick={() => this.onOpenModal(i+1)}
                                            data-for="fase-tooltip"
                                            data-tip={"Fase " + (i+1)}
                                            >
                                        </div>
                                    </li>
                            )
                        } else if (item === "atual") {
                            return (
                                <li className="fase-group" key={i+1}>
                                    <span className="linha-progresso linha-atual"></span>

                                    <Anime
                                        in appear
                                        loop={true}
                                        easing="linear"
                                        // delay={500}
                                        onEntering={{ backgroundColor: ["#4c3cb4", "#999"], duration: 1000 }}
                                    >

                                        <div className="fase fase-atual"
                                            data-for="fase-tooltip"
                                            data-tip="Você está aqui"
                                        >
                                        </div>
                                    </ Anime>
                                </li>
                            )
                        }
                    })}
                </ul>

                <Modal
                    open={this.state.open}
                    onClose={this.onCloseModal}
                    center focusTrapped={false}
                    styles={
                        {
                            modal: {
                                backgroundColor: "#4C3CB4",
                                borderRadius: "0.2em",
                                color: "#fff",
                                width: "80%",
                            },
                            overlay: {
                                backdropFilter: "blur(15px)",
                                backgroundColor: "#4c3cb446",
                                borderRadius: "0.2em"
                            },
                        }}
                >
                    <h2>Fase {this.state.faseModal}</h2>
                    <p>{this.state.texto}</p>
                </Modal>
            </div>

        )

    }
}