import React,{Component} from "react";
import Cadeado from "../assets/icons/lock-icon.png";
import Trofeu from "../assets/icons/trophy-icon.png";

export default class Progresso extends Component{
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="Progresso">
                {this.props.fase <= 1 ?
                    <div className="fase fase-bloqueada">
                        <img src={Cadeado} alt="Fase bloqueada" className="cadeado"/>
                        <span className="hover-text">
                            Você ainda não desbloqueou essa fase :/
                        </span>
                    </div>
                    :
                    <div className="fase fase-desbloqueada">
                        <span className="hover-text">
                            Lorem ipsum dolor sit amet
                        </span>
                    </div>
                }

                {this.props.fase <= 2 ?
                    <div className="fase fase-bloqueada">
                        <img src={Cadeado} alt="Fase bloqueada" className="cadeado"/>
                        <span className="hover-text">
                            Você ainda não desbloqueou essa fase :/
                        </span>
                    </div>
                    :
                    <div className="fase fase-desbloqueada">
                        <span className="hover-text">
                            Lorem ipsum dolor sit amet
                        </span>
                    </div>
                }

                {this.props.fase <= 3 ?
                    <div className="fase fase-bloqueada">
                        <img src={Cadeado} alt="Fase bloqueada" className="cadeado"/>
                        <span className="hover-text">
                            Você ainda não desbloqueou essa fase :/
                        </span>
                    </div>
                    :
                    <div className="fase fase-desbloqueada">
                        <span className="hover-text">
                            Lorem ipsum dolor sit amet
                        </span>
                    </div>
                }

                {this.props.fase <= 4 ?
                    <div className="fase fase-bloqueada">
                        <img src={Cadeado} alt="Fase bloqueada" className="cadeado"/>
                        <span className="hover-text">
                            Você ainda não desbloqueou essa fase :/
                        </span>
                    </div>
                    :
                    <div className="fase fase-desbloqueada">
                        <span className="hover-text">
                            Lorem ipsum dolor sit amet
                        </span>
                    </div>
                }

                {this.props.fase <= 5 ?
                    <div className="fase fase-bloqueada">
                        <img src={Cadeado} alt="Fase bloqueada" className="cadeado"/>
                        <span className="hover-text">
                            Você ainda não desbloqueou essa fase :/
                        </span>
                    </div>
                    :
                    <div className="fase fase-desbloqueada">
                        <span className="hover-text">
                            Lorem ipsum dolor sit amet
                        </span>
                    </div>
                }

                {this.props.fase <= 6 ?
                    <div className="fase fase-bloqueada fase-final">
                        <img src={Trofeu} alt="Fase bloqueada" className="trofeu trofeu-bloqueado"/>
                        <span className="hover-text">
                            Você ainda não desbloqueou essa fase :/
                        </span>
                    </div>
                    :
                    <div className="fase fase-desbloqueada fase-final">
                        <img src={Trofeu} alt="Você venceu" className="trofeu"/>
                        <span className="hover-text">
                            Fase final
                        </span>
                    </div>
                }


            </div>
        )

    }
}