import React from "react";
import {Link} from "react-router-dom";
import "./Home.css";

export default function Home(){
    return(
        <div className="Home">
            <header className="main-header container">
                <nav className="main-nav">
                    <a href="#">Como jogar</a>
                    <a href="#">Sobre</a>
                    <a href="#">Colletivo Design</a>
                </nav>
                
                {/* adicionar logo e imagem do cerebro */}
                {/* <img />  */}
                <p>Lorem ipsum dolor sit amet, consectetur adisciping elit</p> 

                <span className="botao-jogar">
                    {/* adicionar imagem do play */}
                    {/* <img /> */}
                    <p>Iniciar</p>
                </span>               
                
                
            </header>
            <section className="como-jogar container">
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
            <section className="sobre container">
            </section>
            <section className="colletivo container">
            </section>
            <footer className="rodape container">
            </footer>
        </div>
    )
}