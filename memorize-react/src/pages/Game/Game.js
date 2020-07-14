import React, { Component } from 'react';
import './Game.css';
import './Game1920.css';
import './Game768.css';
import './Game425.css';
import anime from 'animejs/lib/anime.es.js';
import { Link } from 'react-router-dom';
import SetaHome from '../../assets/img/voltar-home.png';
import Logo from '../../assets/img/logo-memorize.png';
import Progresso from '../../components/Progresso';
import Sequenciador from "../../components/Sequenciador";
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import ImagemErro from '../../assets/img/erro.png';
import MusicaSucesso from "../../assets/sounds/sucesso.mp3";


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

            modalAberto: null,

            finalizarJogo: false,
        }
    }

    transformarEmCores = (arrayDeCores) => {
        let novaArray = [];
        for (let i = 0; i < arrayDeCores.length; i++) {
            const numero = arrayDeCores[i];

            switch (numero) {
                case 1:
                    novaArray.push('AMARELO');
                    break;
                case 2:
                    novaArray.push('AZUL');
                    break;
                case 3:
                    novaArray.push('VERDE');
                    break;
                case 4:
                    novaArray.push('VERMELHO');
                    break;
                default:
                    console.log("default do transformar em cores")
                    break;
            }
        }
        return novaArray;
    }

    transformarEmNumeros = (arrayDeNumeros) => {
        let arrayNova = [];
        for (let i = 0; i < arrayDeNumeros.length; i++) {
            const cor = arrayDeNumeros[i];

            switch (cor.toUpperCase()) {
                case 'AMARELO':
                    arrayNova.push(1);
                    break;
                case 'AZUL':
                    arrayNova.push(2);
                    break;
                case 'VERDE':
                    arrayNova.push(3);
                    break;
                case 'VERMELHO':
                    arrayNova.push(4);
                    break;
                default:
                    console.log("default do transformar em numeros");
                    break;
            }
        }

        return arrayNova;
    }

    obterStatus = async () => {
        // let url = 'https://memorize.southcentralus.cloudapp.azure.com:5001/api/sessao';

        // await fetch(url, {
        //     headers: {
        //         "Access-Control-Allow-Headers": "*",
        //     }
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         this.lidarComStatus(data);
        //     })
        //     .catch(error => {
        //         this.setState({ erro: true, codigoErro: error.status });
        //         console.log(error);
        //     })

        var statusTeste = {
            fase: 3,
            passarDeFase: false,
            sequenciaCorreta: [2, 3, 4],
            sequenciaRecebida: [2, 3,],
            errou: false,
        }

        this.lidarComStatus(statusTeste);
    }

    lidarComStatus = (status) => {
        console.log(status)

        if (status.sucesso !== undefined && status.sucesso !== null && !status.sucesso) {
            // se nao tiver uma sessao ainda
            this.criarSessao();

        } else {
            // se ja tiver uma sessao acontecendo
            try {
                var { sequenciaRecebida, sequenciaCorreta, fase, passarDeFase, errou, id } = status;

                this.setState({ idSessao: id });
                this.setState((prevState) => {

                    if (sequenciaRecebida.length === sequenciaCorreta.length) {
                        console.log("DEVERIA MOSTRAR A SEQUENCIA RECEBIDA")
                        // se recebeu a sequencia completa, exibe ela:
                        return ({
                            sequenciaExibida: this.transformarEmCores(sequenciaRecebida),
                            mensagemExibida: "Essa foi sua sequência",
                            sequenciaCorreta: sequenciaCorreta,
                            fase: fase,
                            sequenciaRecebida: sequenciaRecebida,
                            errouAFase: errou,
                            passarDeFase: passarDeFase,
                        })


                    } else if (prevState.sequenciaCorreta.length !== sequenciaCorreta.length || prevState.errouAFase && !errou) {
                        console.log("deviatadiferente");
                        return ({
                            //SE MUDOU A SEQUENCIA A SER RECEBIDA(quando a sequencia é criada, seja porque passaram de fase ou porque erraram a fase e vão refazê-la)
                            mensagemExibida: "Decore essa sequência!",
                            sequenciaExibida: this.transformarEmCores(sequenciaCorreta),

                            sequenciaCorreta: sequenciaCorreta,
                            fase: fase,
                            sequenciaRecebida: sequenciaRecebida,

                        })
                    } else {
                        //SE JA EXIBIU A SEQUENCIA QUE TEM QUE DECORAR E AINDA NAO RECEBEU A SEQUENCIA COMPLETA DOS SENSORES (esse é o caso mais comum)
                        console.log("else");
                        console.log(this.state)

                        return ({
                            mensagemExibida: "Sua vez! Aguardando sequência completa dos botões...",
                            sequenciaCorreta: sequenciaCorreta,
                            fase: fase,
                            sequenciaRecebida: sequenciaRecebida,
                        })
                    }

                    //verificarModals acontece no callback do setstate
                }, this.verificarModals)

            } catch (error) {
                alert("try catch principal")
                this.setState({ erro: true });
                console.log(error);
            }
        }
    }

    verificarModals = () => {
        const { passarDeFase, errouAFase, sequenciaRecebida } = this.state;

        // EXPLICANDO O TEMPO DE ESPERA:
        // O 3000 É O DELAY QUE TEM PARA COMEÇAR A ANIMAÇAO DA SEQUENCIA (VEJA EM components/Sequenciador.js) mais um segundo pra dar um tempinho
        // 1200 é o tempo de cada animação completa mais o delay (VEJA EM components/Sequenciador.js)
        // depois do tempo determinado no timeout, ele vai setar o estado como errou de fase, que abrirá o modal de erro
        let tempoDeEspera = 3000 + sequenciaRecebida.length * 1200;


        if (passarDeFase && !errouAFase) {
            setTimeout(() => {
                this.setState({ modalAberto: "acertou" })
            }, tempoDeEspera);
        } else if (errouAFase && !passarDeFase) {
            setTimeout(() => {
                this.setState({ modalAberto: "errou" })
            }, tempoDeEspera);
        }
    }



    criarSessao = async () => {

        //como vai criar a primeira fase, a quantidade de cores na sequencia sempre vai ser 3
        let sequenciaCorreta = this.criarSequencia(3);

        //body mandado na requisicao
        let requestBody = {
            Fase: 1,
            SequenciaCorreta: this.transformarEmNumeros(sequenciaCorreta),
        }

        //url da requisicao
        let url = 'https://memorize.southcentralus.cloudapp.azure.com:5001/api/sessao/';
        await fetch(url, {
            method: 'POST',
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
    }

    fecharModalDeErro = () => {
        this.setState({ errouAFase: false, modalAberto: null });
        this.criarFase(this.state.fase);
        this.obterStatus();
    }

    fecharModalDeAcerto = () => {
        this.setState({ passarDeFase: false, modalAberto: null });
        this.criarFase(this.state.fase + 1);
        this.obterStatus();
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
                quantidade = 8;
                break;

            default:
                fase = 1;
                break;
        }

        // this.obterStatus();
        // // se deve criar a mesma fase,
        // if (this.state.errouAFase && this.state.fase === fase) {
        //     console.log("errou: deve criar a mesma fase");
        // }

        let sequenciaCorreta = this.criarSequencia(quantidade);

        // this.setState({
        //     mensagemExibida: 'Decore essa sequência!',
        //     sequenciaCorreta: sequenciaCorreta,
        //     sequenciaExibida: this.transformarEmCores(sequenciaCorreta),
        // });
        // this.setState({ mensagemExibida: 'Aguardando sequência...' });


        let requestBody = {
            NovaFase: fase,
            NovaSequencia: this.transformarEmNumeros(sequenciaCorreta),
            id: this.state.idSessao,
        }


        // CRIAR SESSAO OU PASSAR DE FASE
        let url = 'https://memorize.southcentralus.cloudapp.azure.com:5001/api/sessao/passarfase';
        await fetch(url, {
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
        this.setState({ open: false, erro: false });

    };


    onCloseModalErroReq = () => {
        this.props.history.go();
    };

    render() {
        const { open, erro, modalAberto, mensagemExibida } = this.state;

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
                    </div>
                </nav>

                <div className='game-content main'>
                    <Progresso fase={this.state.fase} />

                    <Sequenciador sequencia={this.state.sequenciaExibida} />

                    <p className='status-game'>{mensagemExibida}</p>
                </div>

                {/* modal de erro geral */}
                <Modal
                    open={erro}
                    onClose={this.onCloseModalErroReq}
                    center
                    focusTrapped={false}
                    styles={{
                        modal: {
                            border: "3px solid #ff3333",
                            borderRadius: "5px",
                            textAlign: "center",
                            backgroundColor: "#EF476F",
                            color: "#fff",
                        },
                        overlay: {
                            backgroundColor: "#EF476F50",
                            backdropFilter: "blur(15px)",
                        }
                    }}
                >
                    <h2>Eita!</h2>
                    <p>Aconteceu um erro inesperado! Por favor, tente novamente mais tarde!</p>
                    {this.state.codigoErro === null || this.state.codigoErro === '' || this.state.codigoErro === undefined ? null :
                        <p>Código do erro: {this.state.codigoErro}</p>
                    }
                    {/* <img className="imagem-erro" src={ImagemErro} alt="" /> */}
                </Modal>

                {/* modal de erro na sequencia */}
                <Modal
                    open={modalAberto === "errou"}
                    showCloseIcon={false}
                    onClose={this.fecharModalDeErro}
                    center
                    focusTrapped={false}
                    styles={{
                        modal: {
                            border: "3px solid #ff3333",
                            borderRadius: "5px",
                            textAlign: "center",
                            backgroundColor: "#ffe9e9dd"
                        },
                        overlay: {
                            backgroundColor: "#EF476F50",
                            backdropFilter: "blur(15px)",
                        }
                    }}
                >
                    <h3 className="titulo-erro">Eita!</h3>
                    <p>Você errou a sequência! Tente novamente :P</p>
                    <img className="imagem-erro" src={ImagemErro} alt="" />

                    <span className="recomecar-fase" onClick={() => this.setState({ modalAberto: "" })}>
                        <p>Tentar novamente</p>
                        <img src={SetaHome} className="recomecar-fase-seta" alt="" />
                    </span>
                </Modal>

                {/* modal de acerto */}
                <Modal
                    open={modalAberto === "acertou"}
                    showCloseIcon={false}
                    onClose={this.fecharModalDeAcerto}
                    center
                    focusTrapped={false}
                    styles={{
                        modal: {
                            border: "3px solid #06D6A0",
                            borderRadius: "5px",
                            textAlign: "center",
                            backgroundColor: "#ffe9e9dd"
                        },
                        overlay: {
                            backgroundColor: "#06D6A050",
                            backdropFilter: "blur(15px)",
                        }
                    }}
                >
                    <h3 className="titulo-acerto">Parabéns!</h3>
                    <p>Você acertou a sequência e desbloqueou um novo capítulo!</p>
                    <p>Veja o capítulo desbloqueado no progresso das fases (bolinhas roxas).</p>

                    <span className="avancar-fase" onClick={() => this.setState({ modalAberto: "" })}>
                        <p>Ir para próxima fase</p>
                        <img src={SetaHome} className="avancar-fase-seta" alt=""/>
                    </span>

                    <audio autoplay>
                        <source src={MusicaSucesso} type="audio/mpeg" />
                    </audio>
                </Modal>

                {/* Modal de duvida */}
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
        )
    }
}