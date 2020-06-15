import React from "react";
import Cerebro from '../../assets/img/cerebro.png'
import LogoMemorize from '../../assets/img/logo-memorize.png'
import LogoColletivo from '../../assets/img/logo-colletivo.png'
import OnibusColletivo from '../../assets/img/onibus-colletivo.png'
import BtnIniciar from '../../assets/img/btn-iniciar.png'
import {Link} from "react-router-dom";
import "./Home.css";

export default function Home(){
    return(
        <div className="Home">
            <section className='header'>
                <header className="main-header-container">
                    <nav className="main-nav">
                        <a href="#">Como jogar</a>
                        <a href="#">Sobre</a>
                        <a href="#">Colletivo Design</a>
                    </nav>

                    <div className='home-principal'>
                        <span className='secreto'></span>
                        <div className='home-logo'>
                            <img src={LogoMemorize}/>
                            <p className='sub-logo'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pharetra rutrum tempor!</p> 
                            <br/>
                            <span className="botao-jogar">
                                <img src={BtnIniciar}/>
                                <p>INICIAR</p>
                            </span>               
                        </div>
                    </div>
                    
                    
                </header>
            </section>
            <section className="como-jogar-container">
                <h2>Como Jogar</h2>
                <div>
                    <ul>
                        <li>1.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci</li>
                        <li>2.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci, aliquam vel sagittis a, molestie lobortis nibh.</li>
                        <li>3.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum urna orci, aliquam vel sagittis a, molestie lobortis nibh.</li>
                    </ul>
                    {/* adicionar imagem de como jogar */}
                    {/* <img /> */}
                </div>
                <span className="botao-jogar">
                    {/* <img /> */}
                    <p>Iniciar</p>
                </span>    
            </section>
            <section className="sobre-container">
                <h1>Sobre</h1>
                <h1>O que é?</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et risus mollis, accumsan purus sit amet, pretium enim. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vel nisl ut odio efficitur ullamcorper ut at mauris</p>
                <h1>Quem somos?</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et risus mollis, accumsan purus sit amet, pretium enim. Aliquam erat volutpat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent vel nisl ut odio efficitur ullamcorper ut at mauris</p>
            </section>
            <section className="colletivo-container">
            </section>
                <p>Este projeto é oferecido por</p>
                <img src={LogoColletivo} className='logoColletivo'/>
                <img src={OnibusColletivo} className='onibusColletivo'/>
                <p>Conhecido por desenvolver e transformar design de forma estratégica para grandes empresas à startups, o Colletivo Design trabalha com branding, design gráfico e digital, ilustração, embalagem, sinalização, instalações digitais para publicidade, filmes, música e entretenimento em quase 15 anos de história.</p>
                <span className='btn-colletivo'>
                    <p>Ir para o site</p>  
                </span>

                
            <footer className="rodape container">
            </footer>
        </div>
    )
}