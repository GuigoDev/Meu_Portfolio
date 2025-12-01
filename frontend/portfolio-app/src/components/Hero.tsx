import './Hero.css';
import perfilHome from '../assets/perfilHome.png';

export const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-content">
          {/* Coluna da Esquerda (Imagem) - VEIO PRIMEIRO AGORA */}
          <div className="hero-image">
            <img src={perfilHome} alt="Ilustração do perfil de Guilherme Romero" />
          </div>

          {/* Coluna da Direita (Texto) */}
          <div className="hero-text">
            <h1 className="hero-title">
              Olá, sou <span className="highlight">Guilherme Romero</span>
            </h1>
            <h2 className="hero-subtitle">Desenvolvedor Full Stack</h2>
            <p className="hero-description">
              Especializado em criar soluções web modernas e eficientes com 
              React, TypeScript, C# .NET e muito mais.
            </p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">Ver Projetos</a>
              <a href="#contact" className="btn btn-secondary">Entrar em Contato</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};