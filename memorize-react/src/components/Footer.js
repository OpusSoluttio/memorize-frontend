import React from "react";
import LogoFooter from '../assets/img/logofooter.png';
// import anime from 'animejs/lib/anime.es.js';
// import Anime from "@mollycule/react-anime";


export default function Footer() {
    return (
        <footer className="wavy-footer">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#4c3cb4" fillOpacity="1" d="M0,288L48,277.3C96,267,192,245,288,250.7C384,256,480,288,576,293.3C672,299,768,277,864,261.3C960,245,1056,235,1152,240C1248,245,1344,267,1392,277.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>

            <div className="footer-container">
                <div className="footer-content">
                    <img className="logo-footer" src={LogoFooter} alt="Logo do Memo Rize" />
                    <p className="copyright">© 2020 Opus Soluttio. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    )
}