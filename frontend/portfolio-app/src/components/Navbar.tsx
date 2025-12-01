import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <a href="#home" className="logo" onClick={(e) => handleScroll(e, 'home')}>
            Guilherme<span className="logo-highlight">Romero</span>
          </a>
          
          <ul className="nav-links">
            <li>
              <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Início</a>
            </li>
            <li>
              <a href="#skills" onClick={(e) => handleScroll(e, 'skills')}>Habilidades</a>
            </li>
            <li>
              <a href="#projects" onClick={(e) => handleScroll(e, 'projects')}>Projetos</a>
            </li>
            {/* Link de Experiência REMOVIDO daqui */}
            <li>
              <a href="#contact" onClick={(e) => handleScroll(e, 'contact')}>Contato</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};