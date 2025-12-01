import './Navbar.css';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* O logo já está correto com a fonte Jaro */}
          <a href="#home" className="logo">
            Guilherme<span className="logo-highlight">Romero</span>
          </a>
          
          {/* Atualizamos a ordem dos links aqui */}
          <ul className="nav-links">
            <li><a href="#home">Início</a></li>
            <li><a href="#skills">Habilidades</a></li>
            <li><a href="#projects">Projetos</a></li>
            <li><a href="#experience">Experiência</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};