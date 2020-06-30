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

        // console.log(prevProps);
        // console.log(this.props);
    }

    // FIX ME - NAO ESTA REPETINDO AS CORES QUANDO PRECISA
    exibirSequencia = (sequencia) => {
        

        var animacoes = anime.timeline({
            delay : 400,
            autoplay : false,
        })

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

            animacoes.add({
                targets: botao,
                scale: [1, 1.25, 1],
                keyFrames : [{backgroundColor : "#ffffff"}],
                direction: 'alternate',
                easing: 'cubicBezier(.5, .05, .1, .3)'
            })

            setTimeout(() => {
                animacoes.play();
            }, 6000);

            // anime({
            //     targets: botao,
            //     delay: (i * 1000) + 5000,
            //     brightness: 200,
            //     scale: 1.3,
            //     duration: 350,
            //     direction: 'alternate',
            //     easing: 'easeInOutExpo',
            // })

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
