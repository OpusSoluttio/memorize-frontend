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
            frase: '',
            titulo: '',
            faseModal: "",
            urlImg: null,
        }
    }

    onOpenModal = (fase) => {
        let faseBuscada = fases.modalFases.find(item => item.faseModal === fase);
        // let foto = require(faseBuscada.urlimg)

        this.setState({
            open: true,
            faseModal: faseBuscada.faseModal,
            texto: faseBuscada.texto,
            frase: faseBuscada.frase,
            titulo: faseBuscada.titulo,
            urlImg: faseBuscada.urlimg,
        })
    };

    onCloseModal = () => {
        this.setState({ open: false });

        setTimeout(() => {
            this.setState({ texto: "", faseModal: "" })
        }, 250);
    }

    obterTituloDaFase = (fase) => {
        let faseBuscada = fases.modalFases.find(item => item.faseModal === fase);
        if (faseBuscada !== null) {
            return faseBuscada.titulo;
        }
    }

    componentDidUpdate(prevProps) {

        if (prevProps.fase < 7 && this.props.fase >= 7) {
            //fase atual menos uma (mostra a ultima desbloqueada)
            let faseBuscada = fases.modalFases.find(item => item.faseModal === 6);


            this.setState({
                open: true,
                faseModal: faseBuscada.faseModal,
                texto: faseBuscada.texto,
                frase: faseBuscada.frase,
                titulo: faseBuscada.titulo,
                urlImg: faseBuscada.urlimg,
            })

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

        const { texto, frase, titulo, urlImg, open } = this.state;
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
                                <li className="fase-group" key={i + 1}>
                                    <div className="fase fase-bloqueada fase-final fase-final-bloqueada"
                                        data-for="fase-tooltip"
                                        data-tip="Você ainda não desbloqueou essa fase :/"
                                    ></div>
                                </li>
                            )
                        } else if (i === 5 && item === "atual") {
                            return (
                                <li className="fase-group" key={i + 1}>
                                    <Anime
                                        in appear
                                        loop={true}
                                        easing="linear"
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
                                <li className="fase-group" key={i + 1}>
                                    <div className="fase fase-final"
                                        onClick={() => this.onOpenModal(6)}
                                        data-for="fase-tooltip"
                                        data-tip={"Parabéns! Você venceu!"}
                                    >
                                    </div>
                                </li>
                            )
                        } else if (item === "bloqueada") {
                            return (
                                <li className="fase-group" key={i + 1}>
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
                                <li className="fase-group" key={i + 1}>
                                    <span className="linha-progresso"></span>
                                        <div className="fase"
                                            onClick={() => this.onOpenModal(i + 1)}
                                            data-for="fase-tooltip"
                                            data-tip={"Capítulo " + (i + 1)}
                                        >
                                        </div>
                                </li>
                            )
                        } else if (item === "atual") {
                            return (

                                <li className="fase-group" key={i + 1}>
                                    <span className="linha-progresso linha-atual"></span>
                                    <Anime
                                        in appear
                                        loop={true}
                                        easing="linear"
                                        onEntering={{ backgroundColor: ["#4c3cb4", "#999"], duration: 1000 }}
                                    >
                                        <div className="fase fase-atual"
                                            data-for="fase-tooltip"
                                            data-tip="Você está aqui"
                                        ></div>
                                    </Anime>

                                </li>
                            )
                        }
                        return null;
                    })}
                </ul>

                <Modal
                    open={open}
                    onClose={this.onCloseModal}
                    center focusTrapped={false}
                    styles={
                        {
                            modal: {
                                backgroundColor: "#4C3CB4",
                                borderRadius: "0.2em",
                                color: "#fff",
                                width: "80%",
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            },
                            overlay: {
                                backdropFilter: "blur(15px)",
                                backgroundColor: "#4c3cb446",
                                borderRadius: "0.2em"
                            },
                        }}
                >

                    <h2 className="titulo-fase">{titulo}</h2>
                    <p className="frase-fase">{frase}</p>
                    <br/>
                    <p className="texto-fase">{texto}</p>
                    
                    {urlImg === null || urlImg === undefined ? null : 
                        <img src={urlImg} alt="" className="modal-fase-img"/>
                    }


                    {/* {fase === 7 ? null: <p>Obrigado por jogar o Memo Rize! A equipe Opus Soluttio agradece!</p>} */}
                </Modal>
            </div>

        )

    }
}