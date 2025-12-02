import { useState } from 'react';
import './Footer.css';

export const Footer = () => {
  const [showToast, setShowToast] = useState(false);
  const email = "guilherme.romero074@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setShowToast(true);
    
    // Esconde o toast após 3 segundos
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <footer className="footer" id="contact">
      <div className={`toast ${showToast ? 'show' : ''}`}>
        ✅ Email copiado com sucesso!
      </div>

      <div className="container">
        <h2 className="footer-title">Vamos conversar</h2>
        
        <div className="footer-content-wrapper">
          <div className="contact-list">
            
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <button 
                onClick={handleCopyEmail} 
                className="contact-value copy-btn"
                title="Clique para copiar o email"
              >
                {email}
                <span className="copy-icon" aria-label="ícone de copiar"></span>
              </button>
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
            <div className="contact-item action-item">
              <span className="contact-label">WhatsApp:</span>
              <a 
                href="https://wa.me/5541984486364?text=Olá Guilherme, vi seu portfólio e gostaria de conversar!" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-btn"
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