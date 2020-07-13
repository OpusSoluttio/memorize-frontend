import React from "react";
import anime from 'animejs/lib/anime.es.js';

export default class Sequenciador extends React.Component {
    constructor(props) {
        super(props);
        this.botaoAmarelo = React.createRef();
        this.botaoAzul = React.createRef();
        this.botaoVerde = React.createRef();
        this.botaoVermelho = React.createRef();
    }

    componentDidUpdate(prevProps){
        if (this.props.sequencia.length !== prevProps.sequencia.length){
            this.exibirSequencia(this.props.sequencia);
            console.log("diferente")
        } else {
            console.log("igual");
        }
    }

    // FIX ME - NAO ESTA REPETINDO AS CORES QUANDO PRECISA
    exibirSequencia = (sequencia) => {
        
        // cria uma "linha do tempo" de animacoes, que ainda nao e iniciada
        var animacoes = anime.timeline({
            delay: 300,
            autoplay : false,
        })

        //para cada cor na sequencia, ele vai pegar a "ref" da cor
        sequencia.map((cor, i) => {
            let botao;

            switch (cor.toUpperCase()) {
                case "AMARELO":
                    botao = this.botaoAmarelo.current;
                    break;
                case "VERMELHO":
                    botao = this.botaoVermelho.current;
                    break;
                case "AZUL":
                    botao = this.botaoAzul.current;
                    break;
                case "VERDE":
                    botao = this.botaoVerde.current;
                    break;
                default:
                    break;
            }

            // com a ref certa, ele vai adicionar uma animacao a linha do tempo de animacoes
            animacoes.add({
                targets: botao,
                scale: [0.5, 1.3, 1],
                filter: [
                    "none",
                    "brightness(150%)",
                    "brightness(100%)",
                ],
                easing: 'linear',
            })

            // a linha do tempo de animacoes vai iniciar apos o tempo determinado
            setTimeout(() => {
                animacoes.play();
            }, 2000);
        });
    }

    render() {

        return (
            <div className='botao-principal'>
                <div className='botao-cor amarelo' ref={this.botaoAmarelo}>
                </div>
                <div className='botao-cor verde' ref={this.botaoVerde}>
                </div>
                <div className='botao-cor vermelho' ref={this.botaoVermelho}>
                </div>
                <div className='botao-cor azul' ref={this.botaoAzul}>
                </div>
            </div>
        )
    }
}
