import React, { Component } from 'react';
import './Game.css';
import './Game425.css'; //MANO NADA FUNCIONA NESSA CACETA DE CSS
import './Game768.css';
import './Game1920.css';
import anime from 'animejs/lib/anime.es.js';
import { Link } from 'react-router-dom';
import SetaHome from '../../assets/img/voltar-home.png'
import Logo from '../../assets/img/logo-memorize.png';
import Progresso from '../../components/Progresso';
import Sequenciador from "../../components/Sequenciador";
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";


const cores = ['AMARELO', 'AZUL', 'VERDE', 'VERMELHO'];

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            erro: false,

            open: false,

            fase: null,
            sequenciaCorreta: [],
            sequenciaRecebida: [],
            sequenciaExibida : [],
            errouAFase: false,
            passarDeFase: false,
            mensagemExibida: '',

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
                    this.setState({ erro: true });
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
                    this.setState({ erro: true });
                    break;
            }
        }

        return arrayDeNumeros;
    }

    obterStatus = async () => {
        // let url = 'http://localhost:5000/api/teste';

        // await fetch(url)
        // .then(response => response.json())
        // .then(data => {
        //     // this.lidarComStatus(data);
        // })
        // .catch(error => {
        //     this.setState({erro : true});
        //     console.log(error);
        // })

        var statusTeste = {
            fase: 3,
            passarDeFase: true,
            sequenciaCorreta: [1, 2, 3, 4,3,2,1,4],
            sequenciaRecebida: [1, 4, 3],
            errou: true,
        }

        this.lidarComStatus(statusTeste);
    }

    lidarComStatus = (status) => {
        console.log(status)
        var { sequenciaRecebida, sequenciaCorreta, fase, passarDeFase, errou } = status;
        try {

            // this.setState({
            //     fase: fase,
            //     sequenciaRecebida : sequenciaRecebida,
            //     sequenciaCorreta : sequenciaCorreta,
            // })

            this.setState((prevState) => {
                if (prevState.sequenciaCorreta.length !== sequenciaCorreta.length) {
                    console.log("deviatadiferente")
                    return ({
                        //SE MUDOU, DEVE EXIBIR A SEQUENCIA
                        sequenciaExibida: this.transformarEmCores(sequenciaCorreta),

                        sequenciaCorreta: sequenciaCorreta,
                        fase: fase,
                        sequenciaRecebida: sequenciaRecebida
                    })
                } else if (sequenciaRecebida.length === sequenciaCorreta.length && sequenciaRecebida.length !== prevState.sequenciaRecebida.length) {

                    return ({
                        //SE MUDOU, DEVE EXIBIR A SEQUENCIA
                        sequenciaExibida: this.transformarEmCores(sequenciaRecebida),
                        mensagemExibida : "Essa foi sua sequência",
                        sequenciaCorreta: sequenciaCorreta,
                        fase: fase,
                        sequenciaRecebida: sequenciaRecebida
                    })
                } else {

                    return ({ fase: fase, sequenciaRecebida: sequenciaRecebida })
                }
            
            })

            // se deve fazer alguma coisa
            if (sequenciaRecebida.length === sequenciaCorreta.length) {
                this.setState(() => ({ 
                    sequenciaExibida : this.transformarEmCores(sequenciaRecebida), 
                    mensagemExibida: 'Essa foi a sua sequência',
                }))

                // se erraram a sequencia
                // if (errou) {
                //     this.criarFase(fase);
                //     // se deve passar de fase
                // } else if (!errou && passarDeFase && fase < 6) {
                //     this.criarFase(fase + 1);
                //     // se deve finalizar o jogo
                // } else if (!errou && passarDeFase && fase >= 6) {
                //     this.finalizarJogo();
                // }
            } else {
                // this.exibirSequencia(this.transformarEmCores(sequenciaCorreta));
                this.setState({ mensagemExibida: 'Aguardando sequência...' });
            }
        } catch (error) {
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
        this.setState({ mensagemExibida: 'Decore essa sequência!' });
        this.exibirSequencia(sequenciaCorreta);
        this.setState({ mensagemExibida: 'Aguardando sequência...' });


        let requestBody = {
            fase: fase,
            sequenciaCorreta: this.transformarEmNumeros(sequenciaCorreta),
        }


        // CRIAR SESSAO OU PASSAR DE FASE
        // let url = 'http://localhost:5000/api/teste';
        // fetch(url,{
        //     method: 'POST',
        //     headers: {
        //         'Content-type' : 'application/json',
        //         'Accept' : 'application/json'
        //     },
        //      body : JSON.stringify(requestBody)
        // })
        // .then(response => response.json())
        // .then(data => {

        // })
        // .catch(error => {
        //     console.log(error);
        //     this.setState({erro : true})
        // })

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
        this.setState({ finalizarJogo: true });
    }

    componentDidMount() {
        this.obterStatus();
        setInterval(() => {
            this.obterStatus();
        }, 3000)

        anime({
            targets: '.botao-principal',
            rotate: 360*3 + 45,
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
        this.setState({ open: false });
    };

    render() {
        const { open } = this.state;
        return (
            <div className='Game'>

                <nav className='game-nav game-content'>
                    <Link to='/' className='voltar'>
                        {/* colocar setinha de voltar */}
                        {/* <img alt='' src={}/> */}
                        <img src={SetaHome} />
                        <p>Voltar</p>
                    </Link>
                    <img alt='' src={Logo} className='nav-logo' />
                    <div>
                        <p className='interrogacao' onClick={this.onOpenModal}>?</p>
                        <Modal open={open} onClose={this.onCloseModal} center focusTrapped={false}
                        styles={{modal: {
                                backgroundColor : "#4C3CB4",
                                borderRadius: "0.2em",
                                color: "#fff"
                                },
                                overlay: {
                                    backdropFilter: "blur(15px)",
                                    backgroundColor : "#4c3cb446",
                                    borderRadius: "0.2em"
                                }}}>
                            <div className='comojogar-ajuda-content'>
                                <h2>Como Jogar</h2>
                                <br/>
                                <br/>
                                <ul>
                                    <li>1. Veja e memorize a sequência de cores que será exibida na tela;</li>
                                    <br/>
                                    <li>2. Em seguida utilize os sensores para reproduzir a sequência de cores anteriormente exibida e mostre seu potencial;</li>
                                    <br/>
                                    <li>3. Agora vá para a próxima fase e enfrente os novos desafios e novas sequências, evolua e desbloqueie os novos níveis até o liberar o maior prêmio, o conhecimento!</li>
                                </ul>
                            </div>
                        </Modal>
                    </div>
                </nav>

                <div className='game-content main'>
                    <Progresso fase={this.state.fase} />

                    <Sequenciador sequencia={this.state.sequenciaExibida}/>
                    {/* <div className='botao-principal'>
                        <div className='botao-cor amarelo' ref={this.botaoAmarelo}>
                        </div>
                        <div className='botao-cor verde' ref={this.botaoVerde}>
                        </div>
                        <div className='botao-cor vermelho' ref={this.botaoVermelho}>
                        </div>
                        <div className='botao-cor azul' ref={this.botaoAzul}>
                        </div>
                    </div> */}
                    
                    <p className='status-game'>{this.state.mensagemExibida}</p>
                </div>
            </div>
        )
    }
}