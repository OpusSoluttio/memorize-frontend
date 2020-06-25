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
                                <div>
                                    <li className="fase fase-bloqueada fase-final"></li>
                                </div>
                            )
                        } else if (i === 5 && item === "atual" || i === 5 && item === "desbloqueada") {
                            return (
                                <div>
                                    <li className="fase fase-atual fase-final"></li>
                                </div>
                            )

                        } else if (item === "bloqueada") {
                            return (
                                <div>
                                    <span className="linha-progresso linha-bloqueada"></span>
                                    <li className="fase fase-bloqueada"></li>
                                </div>
                            )
                        } else if (item === "desbloqueada") {
                            return (
                                <div>
                                    <span className="linha-progresso"></span>
                                    <li className="fase"></li>
                                </div>
                            )
                        } else if (item === "atual") {
                            return (
                                <div>
                                    <span className="linha-progresso linha-atual"></span>
                                    <li className="fase fase-atual"></li>
                                </div>
                            )
                        }



                    })}
                </ul>
            </div>
            // <div className="Progresso">
            //     {this.props.fase <= 1 ?
            //         <div className="fase fase-bloqueada">
            //             <img src={Cadeado} alt="Fase bloqueada" className="cadeado" />
            //             <span className="hover-text">
            //                 Você ainda não desbloqueou essa fase :/
            //             </span>
            //         </div>
            //         :
            //         <div className="fase fase-desbloqueada">
            //             <span className="hover-text">
            //                 Lorem ipsum dolor sit amet
            //             </span>
            //         </div>
            //     }

            //     {this.props.fase <= 2 ?
            //         <div className="fase fase-bloqueada">
            //             <img src={Cadeado} alt="Fase bloqueada" className="cadeado" />
            //             <span className="hover-text">
            //                 Você ainda não desbloqueou essa fase :/
            //             </span>
            //         </div>
            //         :
            //         <div className="fase fase-desbloqueada">
            //             <span className="hover-text">
            //                 Lorem ipsum dolor sit amet
            //             </span>
            //         </div>
            //     }

            //     {this.props.fase <= 3 ?
            //         <div className="fase fase-bloqueada">
            //             <img src={Cadeado} alt="Fase bloqueada" className="cadeado" />
            //             <span className="hover-text">
            //                 Você ainda não desbloqueou essa fase :/
            //             </span>
            //         </div>
            //         :
            //         <div className="fase fase-desbloqueada">
            //             <span className="hover-text">
            //                 Lorem ipsum dolor sit amet
            //             </span>
            //         </div>
            //     }

            //     {this.props.fase <= 4 ?
            //         <div className="fase fase-bloqueada">
            //             <img src={Cadeado} alt="Fase bloqueada" className="cadeado" />
            //             <span className="hover-text">
            //                 Você ainda não desbloqueou essa fase :/
            //             </span>
            //         </div>
            //         :
            //         <div className="fase fase-desbloqueada">
            //             <span className="hover-text">
            //                 Lorem ipsum dolor sit amet
            //             </span>
            //         </div>
            //     }

            //     {this.props.fase <= 5 ?
            //         <div className="fase fase-bloqueada">
            //             <img src={Cadeado} alt="Fase bloqueada" className="cadeado" />
            //             <span className="hover-text">
            //                 Você ainda não desbloqueou essa fase :/
            //             </span>
            //         </div>
            //         :
            //         <div className="fase fase-desbloqueada">
            //             <span className="hover-text">
            //                 Lorem ipsum dolor sit amet
            //             </span>
            //         </div>
            //     }

            //     {this.props.fase <= 6 ?
            //         <div className="fase fase-bloqueada fase-final">
            //             <img src={Trofeu} alt="Fase bloqueada" className="trofeu trofeu-bloqueado" />
            //             <span className="hover-text">
            //                 Você ainda não desbloqueou essa fase :/
            //             </span>
            //         </div>
            //         :
            //         <div className="fase fase-desbloqueada fase-final">
            //             <img src={Trofeu} alt="Você venceu" className="trofeu" />
            //             <span className="hover-text">
            //                 Fase final
            //             </span>
            //         </div>
            //     }


            // </div>
        )

    }
}