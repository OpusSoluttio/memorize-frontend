import React from 'react';
import LogoMemorize from '../../assets/img/logo-memorize.png';
import LogoColletivo from '../../assets/img/logo-colletivo.svg';
import OnibusColletivo from '../../assets/img/onibus-colletivo.gif';
import MemorizeJogo from '../../assets/img/memorize-jogo.png';
import SetaColletivo from '../../assets/icons/arrow-icon.png'
import BtnIniciar from '../../assets/img/btn-iniciar.png';
import { Link } from 'react-router-dom';
import { Link as SmoothLink } from "react-scroll";
// import anime from 'animejs/lib/anime.es.js';
import './Home.css';
import './Home1920.css';
import './Home768.css';
import './Home425.css';
import PageProgress from 'react-page-progress';
import Footer from "../../components/Footer";
import Anime from "@mollycule/react-anime";

export default function Home() {

    return (
        <div className='Home'>
            <section className='header'>


                <div className="device-rotation">
                    <h2 className="device-rotation">Vire a tela para acessar a página ;)</h2>
                </div>


                <header className='main-header container'>
                    <nav className='main-nav'>
                        <SmoothLink to="comojogar" smooth={true} className="nav-link">Como Jogar</SmoothLink>
                        <SmoothLink to="sobre" smooth={true} className="nav-link">Sobre</SmoothLink>
                        <SmoothLink to="colletivo" smooth={true} className="nav-link">Colletivo Design</SmoothLink>
                    </nav>
                    <div className='page-progress'>
                        <PageProgress color={'#FF7D76'} height={'5px'} />
                    </div>
                    <Anime
                        in
                        appear
                        duration={0}
                        delay={0}
                        onEntered={{ translateY: [-100, 0], opacity: [0, 1], duration: 2500 }}
                        onExited={{ translateY: -30, opacity: 0 }}
                    >

                        <div className='home-principal content'>
                            <div className='home-section'>

                                <img className='logo' src={LogoMemorize}  alt="Logo do Memo Rize"/>
                                <p className='texto-home-section'>Exercite a memória aprendendo, memorize agora!</p>
                                <br />
                                <Link className='botao-jogar-home' to={"/game"}>
                                    <img src={BtnIniciar} alt=""/>
                                    <p>INICIAR</p>
                                </Link>
                            </div>
                        </div>
                    </Anime>
                </header>
            </section>

            <section className='como-jogar container' id='comojogar'>

                <div className='como-jogar content' >
                    <div className='title-comojogar'>
                        <h2>Como Jogar</h2>
                    </div>
                    <div className='comojogar-section'>
                        <ul>
                            <li>1. Veja e memorize a sequência de cores que será exibida na tela;</li>
                            <li>2. Em seguida utilize os sensores para reproduzir a sequência de cores anteriormente exibida e mostre seu potencial;</li>
                            <li>3. Agora vá para a próxima fase e enfrente os novos desafios e novas sequências, evolua e desbloqueie os novos níveis até o liberar o maior prêmio, o conhecimento!</li>
                        </ul>
                        <img className='memorize-jogo' src={MemorizeJogo}  alt="Jogo Memo Rize"/>
                    </div>
                    <Link to={"/game"} className='botao-jogar-comojogar'>
                        <img src={BtnIniciar}  alt=""/>
                        <p>JOGAR AGORA</p>
                    </Link>
                </div>
            </section>
            <section className='sobre container' id='sobre'>
                <div className='sobre content'>
                    <h2 id="sobre-title">Sobre</h2>

                    <div className="flex-vertical">

                        <div className="titulo-e-texto">
                            <h2>O que é?</h2>
                            <p>Memorize é um jogo divertido e interativo, um game desenvolvido pela Opus Soluttio em parceria com o Estúdio Colletivo. Veja, memorize a sequência de cores, utilize os sensores para reproduzi-la, apresente a sequência correta e passe para uma outra fase com maiores desafios!</p>
                        </div>
                        <div className="center-line"></div>
                        <div className="titulo-e-texto inverte">
                            <h2>Quem somos?</h2>
                            <p>Somos um grupo de estudantes da escola SENAI de informática, apaixonados por tecnologia de redes de computadores e desenvolvimento de sistemas, esse é o projeto de conclusão de nosso curso, somos criativos, persistentes, e sobretudo, somos uma equipe, somos Opus Soluttio.</p>
                        </div>
                    </div>

                </div>
            </section>
            <section className='colletivo container' id='colletivo'>
                <div className='colletivo-content content'>
                    <div className='colletivo-titulo'>
                        <p>Este projeto é oferecido por</p>
                    </div>
                    <div className='colletivo-banner'>
                        <img src={LogoColletivo} className='logoColletivo'  alt="Logo do Colletivo Design"/>
                    </div>
                    <div className='colletivo-informacao'>
                        <img src={OnibusColletivo} className='onibusColletivo'  alt=""/>
                        <p>Conhecido por desenvolver e transformar design de forma estratégica para grandes empresas à startups, o Colletivo Design trabalha com branding, design gráfico e digital, ilustração, embalagem, sinalização, instalações digitais para publicidade, filmes, música e entretenimento em quase 15 anos de história.</p>
                    </div>
                    <a href="https://colletivo.com.br/" target="_blank" className='btn-colletivo' rel="noopener noreferrer">
                        <p>Ir para o site</p>
                        <img src={SetaColletivo} alt="setaGiratoria" />
                    </a>
                </div>
            </section>
            <Footer />
        </div >
    )
}