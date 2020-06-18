import React,{Component} from "react";
import "./Game.css";
import anime from 'animejs/lib/anime.es.js';



const cores = ["AMARELO","AZUL","VERDE","VERMELHO"];

export default class Game extends Component{
    constructor(props){
        super(props);
        this.state = {
            erro : false,

            fase : null,
            sequenciaCorreta : [],
            sequenciaRecebida : [],
            errouAFase : false,
            passarDeFase : false,
            mensagemExibida : "",

            finalizarJogo : false,
        }
    }

    transformarEmCores = (arrayDeCores) => {
        for (let i = 0; i < arrayDeCores.length; i++) {
            const numero = arrayDeCores[i];
            
            switch (numero) {
                case 1:
                    arrayDeCores[i] = "AMARELO";
                    break;
                case 2:
                    arrayDeCores[i] = "AZUL";
                    break;
                case 3:
                    arrayDeCores[i] = "VERDE";
                    break;
                case 4:
                    arrayDeCores[i] = "VERMELHO";
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
                case "AMARELO":
                    arrayDeNumeros[i] = 1;
                    break;
                case "AZUL":
                    arrayDeNumeros[i] = 2;
                    break;
                case "VERDE":
                    arrayDeNumeros[i] = 3;
                    break;
                case "VERMELHO":
                    arrayDeNumeros[i] = 4;
                    break;
                default:
                    this.setState({ erro: true });
                    break;
            }
        }

        return arrayDeNumeros;
    }

    obterStatus = async() => {
        // let url = "http://localhost:5000/api/teste";

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
            fase : 2,
            passarDeFase : true,
            sequenciaCorreta : [1,1,1,1],
            sequenciaRecebida : [1,1,1,1],
            errou : false,
        }

        this.lidarComStatus(statusTeste);
    }

    lidarComStatus = (status) => {
        console.log(status)
        var { sequenciaRecebida, sequenciaCorreta, fase, passarDeFase, errou } = status;
        try {

            this.setState({
                fase : fase,
                sequenciaCorreta : sequenciaCorreta,
                sequenciaRecebida : sequenciaRecebida,
                passarDeFase : passarDeFase,
                errouAFase : errou,
            })

            // se deve fazer alguma coisa
            if (sequenciaRecebida.length === sequenciaCorreta.length) {
                this.setState({mensagemExibida : "Essa foi a sua sequência"});
                this.exibirSequencia(this.transformarEmCores(sequenciaRecebida));

                // se erraram a sequencia
                if (errou) {
                    this.criarFase(fase);
                    // se deve passar de fase
                } else if (!errou && passarDeFase && fase < 6) {
                    this.criarFase(fase + 1);
                    // se deve finalizar o jogo
                } else if (!errou && passarDeFase && fase >= 6) {
                    this.finalizarJogo();
                }
            } else {
                this.setState({mensagemExibida : "Aguardando sequência..."})
            }
        } catch(error) {
            this.setState({erro : true});
            console.log(error);
        }   
    }


    criarFase = async(fase) =>{
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
        this.setState({mensagemExibida : "Decore essa sequência!"});
        this.exibirSequencia(sequenciaCorreta);
        this.setState({mensagemExibida : "Aguardando sequência..."});


        let requestBody = {
            fase : fase,
            sequenciaCorreta : this.transformarEmNumeros(sequenciaCorreta),
        }


        // CRIAR SESSAO OU PASSAR DE FASE
        // let url = "http://localhost:5000/api/teste";
        // fetch(url,{
        //     method: "POST",
        //     headers: {
        //         "Content-type" : "application/json",
        //         "Accept" : "application/json"
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
            var cor = cores[Math.floor(Math.random()*cores.length)];
            sequencia.push(cor);
        }

        return sequencia;
    }

    exibirSequencia = (sequencia) => {
        console.log(sequencia);
    }

    finalizarJogo = () => {
        this.setState( {finalizarJogo : true });
    }

    componentDidMount(){
        setInterval(() => {
            this.obterStatus();
        },3000)

        anime({
            targets: '.destaque',
            scale: 1.11,
            duration: 1000,
            loop: 10,
            direction: 'alternate',
            easing: 'easeInOutExpo',
          });

    }

    render(){
        return(
            <div className="Game">
                <h1> O JOGO </h1>

                <div className="botao-principal">
                    <div className="botao-cor amarelo destaque">
                    </div>
                    <div className="botao-cor verde">
                    </div>
                    <div className="botao-cor vermelho">
                    </div>
                    <div className="botao-cor azul destaque">
                    </div>
                </div>
            </div>
        )
    }


}