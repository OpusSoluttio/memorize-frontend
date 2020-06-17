import React from 'react';
import Cerebro from '../../assets/img/cerebro.png'
import LogoMemorize from '../../assets/img/logo-memorize.png'
import LogoColletivo from '../../assets/img/logo-colletivo.png'
import OnibusColletivo from '../../assets/img/onibus-colletivo.gif'
// import LogoFooter from '../../assets/img/logofooter.png';
import MemorizeJogo from '../../assets/img/memorize-jogo.png';
import SetaColletivo from '../../assets/icons/arrow-icon.png'
import BtnIniciar from '../../assets/img/btn-iniciar.png'
// import {Link} from 'react-router-dom';
import {Link as SmoothLink} from "react-scroll";
import './Home.css';
import PageProgress from 'react-page-progress';
import Footer from "../../components/Footer";

export default function Home(){
    return(
        <div className='Home'>
            <section className='header'>
                <header className='main-header container'>
                    <div className='blur-nav'></div>
                    <nav className='main-nav'>
                        <SmoothLink to="comojogar" smooth={true}>Como jogar</SmoothLink>
                        <SmoothLink to="sobre" smooth={true}>Sobre</SmoothLink>
                        <SmoothLink to="colletivo" smooth={true}>Colletivo</SmoothLink>
                    </nav>
                    <div className='page-progress'>
                        <PageProgress color={'#FF7D76'} height={'5px'}/>
                    </div>
                    <div className='home-principal content'>
                        <div className='home-section'>
                            <img src={LogoMemorize}/>
                            <p className='texto-home-section'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra rutrum tempor!</p> 
                            <br/>
                            <span className='botao-jogar-home'>
                                <img src={BtnIniciar}/>
                                <p>INICIAR</p>
                            </span>   
                        </div>       
                    </div>
                </header>
            </section>
            <section className='como-jogar container' id='comojogar'>
                <div className='como-jogar content' >
                    <div className='title-comojogar'>
                        <h2>Como Jogar</h2>
                    </div>
                    <div className='comojogar-section'>
                        <ul>
                            <li>1.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci</li>
                            <li>2.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci, aliquam vel sagittis a, molestie lobortis nibh.</li>
                            <li>3.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci, aliquam vel sagittis a, molestie lobortis nibh.</li>
                        </ul>
                        <img src={MemorizeJogo}/>
                    </div>
                    <span href='#' className='botao-jogar-comojogar'>
                        <img src={BtnIniciar}/>
                        <p>JOGAR AGORA</p>
                    </span>    
                </div>
            </section>
            <section className='sobre container' id='sobre'>
                <div className='sobre content'>
                    <h2 id="sobre-title">Sobre</h2>
                    <div class="center-line"></div>

                    <div className="titulo-e-texto">
                        <h2>O que é?</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et risus mollis, accumsan purus sit amet, pretium enim. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vel nisl ut odio efficitur ullamcorper ut at mauris</p>
                    </div>
                    <div className="titulo-e-texto inverte">
                        <h2>Quem somos?</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et risus mollis, accumsan purus sit amet, pretium enim. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vel nisl ut odio efficitur ullamcorper ut at mauris</p>
                    </div>
                </div>
            </section>
            <section className='colletivo container' id='colletivo'>
                <div className='colletivo-content content'>
                    <div className='colletivo-titulo'>
                        <p>Este projeto é oferecido por</p>
                    </div>
                    <div className='colletivo-banner'>
                        <img src={LogoColletivo} className='logoColletivo'/>
                    </div>
                    <div className='colletivo-informacao'>
                        <img src={OnibusColletivo} className='onibusColletivo'/>
                        <p>Conhecido por desenvolver e transformar design de forma estratégica para grandes empresas à startups, o Colletivo Design trabalha com branding, design gráfico e digital, ilustração, embalagem, sinalização, instalações digitais para publicidade, filmes, música e entretenimento em quase 15 anos de história.</p>
                    </div>
                    <a href="https://colletivo.com.br/" target="_blank" className='btn-colletivo'>
                        <p>Ir para o site</p>
                        <img src={SetaColletivo} alt="setaGiratoria"/>
                    </a>
                </div>
            </section>
            <Footer />
        </div>
    )
}