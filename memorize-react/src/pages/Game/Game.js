import React, { Component } from 'react';
import './Game.css';
import './Game425.css';
import './Game768.css';
import './Game1920.css';
import anime from 'animejs/lib/anime.es.js';
import { Link } from 'react-router-dom';
import SetaHome from '../../assets/img/voltar-home.png';
import Logo from '../../assets/img/logo-memorize.png';
import Progresso from '../../components/Progresso';
import Sequenciador from "../../components/Sequenciador";
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import { Redirect } from "react-router-dom";
import ImagemErro from '../../assets/img/erro.png'


const cores = ['AMARELO', 'AZUL', 'VERDE', 'VERMELHO'];

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erro: false,
            codigoErro: null,

            open: false,

            idSessao: null,
            fase: null,
            sequenciaCorreta: [],
            sequenciaRecebida: [],
            sequenciaExibida: [],
            errouAFase: false,
            passarDeFase: false,
            mensagemExibida: 'Vamos lá! Se prepare!',

            finalizarJogo: false,
        }
    }

    transformarEmCores = (arrayDeCores) => {
        for (let i = 0; i < arrayDeCores.length; i++) {
            const numero = arrayDeCores[i];

            switch (numero) {
                case 1:
                    arrayDeCores[i] = 'AMARELO';
                    break;
                case 2:
                    arrayDeCores[i] = 'AZUL';
                    break;
                case 3:
                    arrayDeCores[i] = 'VERDE';
                    break;
                case 4:
                    arrayDeCores[i] = 'VERMELHO';
                    break;
                default:
                    console.log("default do transformar em cores")
                    break;
            }

        }

        return arrayDeCores;
    }

    transformarEmNumeros = (arrayDeNumeros) => {
        for (let i = 0; i < arrayDeNumeros.length; i++) {
            const cor = arrayDeNumeros[i];

            switch (cor.toUpperCase()) {
                case 'AMARELO':
                    arrayDeNumeros[i] = 1;
                    break;
                case 'AZUL':
                    arrayDeNumeros[i] = 2;
                    break;
                case 'VERDE':
                    arrayDeNumeros[i] = 3;
                    break;
                case 'VERMELHO':
                    arrayDeNumeros[i] = 4;
                    break;
                default:
                    console.log("default do transformar em numeros")
                    break;
            }
        }

        return arrayDeNumeros;
    }

    obterStatus = async () => {
        let url = 'http://40.84.215.60:5000/api/sessao';

        await fetch(url, {
            headers: {
                "Access-Control-Allow-Headers": "*",
            }
        })
            .then(response => response.json())
            .then(data => {
                this.lidarComStatus(data);
            })
            .catch(error => {
                this.setState({ erro: true, codigoErro: error.status });
                console.log(error);
            })

        // var statusTeste = {
        //     fase: 2,
        //     passarDeFase: false,
        //     sequenciaCorreta: [2,2,4,3,1,3],
        //     sequenciaRecebida: [4, 3, 2],
        //     errou: false,
        // }

        // this.lidarComStatus(statusTeste);
    }

    lidarComStatus = (status) => {
        console.log(status)
        var { sequenciaRecebida, sequenciaCorreta, fase, passarDeFase, errou, id } = status;
        try {

            this.setState({ idSessao: id });

            this.setState((prevState) => {
                if (prevState.sequenciaCorreta.length !== sequenciaCorreta.length) {
                    console.log("deviatadiferente")
                    return ({
                        //SE AINDA NAO CHEGOU TODA A SEQUENCIA DOS SENSORES (essa condição deve acontecer geralmente na primeira vez q o site faz a requisição)
                        mensagemExibida: "Decore essa sequência!",
                        sequenciaExibida: this.transformarEmCores(sequenciaCorreta),

                        sequenciaCorreta: sequenciaCorreta,
                        fase: fase,
                        sequenciaRecebida: sequenciaRecebida,

                    })
                } else if (sequenciaRecebida.length === sequenciaCorreta.length && sequenciaRecebida.length !== prevState.sequenciaRecebida.length) {

                    return ({
                        //SE MUDOU, DEVE EXIBIR A SEQUENCIA
                        sequenciaExibida: this.transformarEmCores(sequenciaRecebida),
                        mensagemExibida: "Essa foi sua sequência",
                        sequenciaCorreta: sequenciaCorreta,
                        fase: fase,
                        sequenciaRecebida: sequenciaRecebida,

                        errouAFase: errou,

                    })
                } else {
                        return ({

                            //SE JA EXIBIU A SEQUENCIA QUE TEM QUE DECORAR E AINDA NAO RECEBEU A SEQUENCIA COMPLETA DOS SENSORES
                            mensagemExibida: "Sua vez! Aguardando sequência...",
                            sequenciaCorreta: sequenciaCorreta,
                            fase: fase,
                            sequenciaRecebida: sequenciaRecebida,

                            passarDeFase: passarDeFase,

                        })
                }

            })

            // se deve fazer alguma coisa
            if (sequenciaRecebida.length === sequenciaCorreta.length) {
                this.setState(() => ({
                    sequenciaExibida: this.transformarEmCores(sequenciaRecebida),
                    mensagemExibida: 'Essa foi a sua sequência',
                }))

                console.log(this.state);
                // se erraram a sequencia
                if (errou) {
                    alert("errou");
                    this.criarFase(fase);
                    // se deve passar de fase
                } else if (!errou && passarDeFase && fase < 6) {
                    this.criarFase(fase + 1);
                    // se deve finalizar o jogo
                } else if (!errou && passarDeFase && fase >= 6) {
                    this.finalizarJogo();
                } else {
                    alert("else")
                }

            } else {
                // this.exibirSequencia(this.transformarEmCores(sequenciaCorreta));
                // this.setState({ mensagemExibida: 'Aguardando sequência...' });
            }
        } catch (error) {
            alert("try catch principal")
            this.setState({ erro: true });
            console.log(error);
        }
    }



    criarFase = async (fase) => {
        let quantidade;

        switch (fase) {
            case 1:
                quantidade = 3;
                break;
            case 2:
                quantidade = 4;
                break;
            case 3:
                quantidade = 5;
                break;
            case 4:
                quantidade = 6;
                break;
            case 5:
                quantidade = 7;
                break;
            case 6:
                quantidade = 9;
                break;

            default:
                fase = 1;
                break;
        }

        let sequenciaCorreta = this.criarSequencia(quantidade);

        this.setState({
            mensagemExibida: 'Decore essa sequência!',
            sequenciaCorreta: sequenciaCorreta,
            sequenciaExibida: sequenciaCorreta,
        });
        // this.setState({ mensagemExibida: 'Aguardando sequência...' });


        let requestBody = {
            NovaFase: fase,
            NovaSequencia: this.transformarEmNumeros(sequenciaCorreta),
            id: this.state.idSessao,
        }


        // CRIAR SESSAO OU PASSAR DE FASE
        let url = 'http://40.84.215.60:5000/api/sessao/passarfase';
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                "Access-Control-Allow-Headers": "*",
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
                this.setState({ erro: true })
            })

        console.log(JSON.stringify(requestBody));
    }

    criarSequencia = (quantidade) => {
        let sequencia = [];

        for (let i = 0; i < quantidade; i++) {
            var cor = cores[Math.floor(Math.random() * cores.length)];
            sequencia.push(cor);
        }

        return sequencia;
    }

    finalizarJogo = () => {
        this.setState({ finalizarJogo: true, fase: 7 });
        
    }

    componentDidMount() {

        // a cada 5 segundos ele checa o status da sessão ativa
        setInterval(() => {
            this.obterStatus();
        }, 5000)

        anime({
            targets: '.botao-principal',
            rotate: 360 * 3 + 45,
            duration: 7000,
            delay: 400,
            loop: false,
            direction: 'alternate',
        })

    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false, erro: false, });
    };

    render() {
        const { open } = this.state;
        return (
            <div className='Game'>

                <nav className='game-nav game-content'>
                    <Link to={"/"} className='voltar'>
                        <img src={SetaHome} alt="" />
                        <p>Voltar</p>
                    </Link>
                    <img alt='' src={Logo} className='nav-logo' />
                    <div>
                        <p className='interrogacao' onClick={this.onOpenModal}>?</p>
                        <Modal open={open} onClose={this.onCloseModal} center focusTrapped={false}
                            styles={{
                                modal: {
                                    backgroundColor: "#4C3CB4",
                                    borderRadius: "0.2em",
                                    color: "#fff"
                                },
                                overlay: {
                                    backdropFilter: "blur(15px)",
                                    backgroundColor: "#4c3cb446",
                                    borderRadius: "0.2em"
                                }
                            }}>
                            <div className='comojogar-ajuda-content'>
                                <h2>Como Jogar</h2>
                                <br />
                                <br />
                                <ul>
                                    <li>1. Veja e memorize a sequência de cores que será exibida na tela;</li>
                                    <br />
                                    <li>2. Em seguida utilize os sensores para reproduzir a sequência de cores anteriormente exibida e mostre seu potencial;</li>
                                    <br />
                                    <li>3. Agora vá para a próxima fase e enfrente os novos desafios e novas sequências, evolua e desbloqueie os novos níveis até o liberar o maior prêmio, o conhecimento!</li>
                                </ul>
                            </div>
                        </Modal>
                    </div>
                </nav>

                <div className='game-content main'>
                    <Progresso fase={this.state.fase} />

                    <Sequenciador sequencia={this.state.sequenciaExibida} />

                    <p className='status-game'>{this.state.mensagemExibida}</p>
                </div>

                <Modal
                    open={this.state.erro}
                    onClose={this.onCloseModal}
                    center
                    focusTrapped={false}
                    styles={{
                        modal: {
                            border: "3px solid #ff3333",
                            borderRadius: "5px",
                            textAlign: "center",
                            backgroundColor: "#ffe9e9"
                        },
                        overlay: {
                            backgroundColor: "#EF476F50",
                            backdropFilter: "blur(15px)",
                        }
                    }}
                >
                    <h3 className="titulo-erro">Eita!</h3>
                    <p>Aconteceu um erro inesperado! Por favor, tente novamente mais tarde!</p>
                    {this.state.codigoErro === null || this.state.codigoErro === '' || this.state.codigoErro === undefined ? null :
                        <p>Código do erro: {this.state.codigoErro}</p>
                    }
                    <img className="imagem-erro" src={ImagemErro} alt="" />
                </Modal>

                <Modal
                    open={this.state.errouAFase}
                    onClose={this.onCloseModal}
                    center
                    focusTrapped={false}
                    styles={{
                        modal: {
                            border: "3px solid #ff3333",
                            borderRadius: "5px",
                            textAlign: "center",
                            backgroundColor: "#ffe9e9"
                        },
                        overlay: {
                            backgroundColor: "#EF476F50",
                            backdropFilter: "blur(15px)",
                        }
                    }}
                >
                    <h3 className="titulo-erro">Eita!</h3>
                    <p>tu erro ein mano prestenção ai</p>
                    <img className="imagem-erro" src={ImagemErro} alt="" />
                </Modal>
            </div>
        )
    }
}