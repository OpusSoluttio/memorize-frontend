import React from 'react';
import Cerebro from '../../assets/img/cerebro.png'
import LogoMemorize from '../../assets/img/logo-memorize.png'
import LogoColletivo from '../../assets/img/logo-colletivo.png'
import OnibusColletivo from '../../assets/img/onibus-colletivo.png'
// import LogoFooter from '../../assets/img/logofooter.png';
import MemorizeJogo from '../../assets/img/memorize-jogo.png';
import BtnIniciar from '../../assets/img/btn-iniciar.png'
import {Link} from 'react-router-dom';
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
                        <a href='#comojogar'>Como Jogar</a>
                        <a href='#sobre'>Sobre</a>
                        <a href='#colletivo'>Colletivo Design</a>
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
                        <hr/>
                    </div>
                    <div className='comojogar-section'>
                        <ul>
                            <li>1.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci</li>
                            <li>2.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci, aliquam vel sagittis a, molestie lobortis nibh.</li>
                            <li>3.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci, aliquam vel sagittis a, molestie lobortis nibh.</li>
                        </ul>
                        <img src={MemorizeJogo}/>
                    </div>
                    <span className='botao-jogar-comojogar'>
                        <img src={BtnIniciar}/>
                        <p>JOGAR AGORA</p>
                    </span>    
                </div>
            </section>
            <section className='sobre container' id='sobre'>
                <div className='sobre content'>
                    <h1>Sobre</h1>
                    <h1>O que é?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et risus mollis, accumsan purus sit amet, pretium enim. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vel nisl ut odio efficitur ullamcorper ut at mauris</p>
                    <h1>Quem somos?</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et risus mollis, accumsan purus sit amet, pretium enim. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vel nisl ut odio efficitur ullamcorper ut at mauris</p>
                </div>
            </section>
            <section className='colletivo container' id='colletivo'>
                <div className='colletivo content'>
                    <p>Este projeto é oferecido por</p>
                    <img src={LogoColletivo} className='logoColletivo'/>
                    <img src={OnibusColletivo} className='onibusColletivo'/>
                    <p>Conhecido por desenvolver e transformar design de forma estratégica para grandes empresas à startups, o Colletivo Design trabalha com branding, design gráfico e digital, ilustração, embalagem, sinalização, instalações digitais para publicidade, filmes, música e entretenimento em quase 15 anos de história.</p>
                    <span className='btn-colletivo'>
                        <p>Ir para o site</p>  
                    </span>
                </div>
            </section>
            <Footer />
        </div>
    )
}