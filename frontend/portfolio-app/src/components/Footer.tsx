import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <h2 className="footer-title">Vamos conversar</h2>
        
        <div className="footer-content-wrapper">
          <div className="contact-list">
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <a href="mailto:guilherme.romero074@gmail.com" className="contact-value">
                guilherme.romero074@gmail.com
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-label">GitHub:</span>
              <a 
                href="https://github.com/GuigoDev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-value"
              >
                Guilherme Romero
              </a>
            </div>

            <div className="contact-item">
              <span className="contact-label">Linkedin:</span>
              <a 
                href="https://www.linkedin.com/in/guilherme-romero-06586a289/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-value"
              >
                Guilherme romero
              </a>
            </div>

            <div className="contact-item whatsapp-item">
              <span className="contact-label">Contato pelo WhatsApp:</span>
              <a 
                href="https://wa.me/5541984486364?text=Olá Guilherme, vi seu portfólio e gostaria de conversar!" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="whatsapp-btn"
              >
                Contato
              </a>
            </div>
          </div>
        </div>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Guilherme Romero. Desenvolvido com React e .NET.
        </p>
      </div>
    </footer>
  );
};