import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { SkillsDashboard } from '../components/SkillsDashboard';
import { gitHubStatsApi } from '../services/api';
import type { GitHubRepoDTO } from '../types';
import './Home.css';

export const Home = () => {
  const [repos, setRepos] = useState<GitHubRepoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTechnology, setSelectedTechnology] = useState('Todos');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const loadRepos = async () => {
      try {
        const response = await gitHubStatsApi.getRepos();
        setRepos(response.data);
      } catch (error) {
        console.error('Erro ao carregar repositórios:', error);
      } finally {
        setLoading(false);
      }
    };
    loadRepos();
  }, []);

  const filteredRepos = selectedTechnology === 'Todos' 
    ? repos 
    : repos.filter(repo => repo.language === selectedTechnology);

  const totalPages = Math.ceil(filteredRepos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRepos = filteredRepos.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero />
      
      <SkillsDashboard 
        selectedTechnology={selectedTechnology} 
        onTechnologySelect={(tech) => {
          setSelectedTechnology(tech);
          setCurrentPage(1);
        }} 
      />

      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Meus Projetos</h2>
          <div className="section-divider"></div>

          {loading ? (
            <p className="loading-text">Carregando projetos do GitHub...</p>
          ) : (
            <>
              <div className="repo-list">
                {currentRepos.map(repo => (
                  <a 
                    key={repo.id} 
                    href={repo.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="repo-card"
                  >
                    <div className="repo-avatar">
                      <img src={repo.avatarUrl} alt="Avatar" />
                    </div>
                    <div className="repo-info">
                      <span className="repo-name">{repo.title}</span>
                      <span className="repo-lang">
                        {repo.language !== "Outros" ? repo.language : ""}
                      </span>
                    </div>
                    <div className="repo-arrow">&gt;</div>
                  </a>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination-controls">
                  <button 
                    onClick={() => goToPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    &lt;
                  </button>
                  <span className="pagination-info">{currentPage}</span>
                  <button 
                    onClick={() => goToPage(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <section className="projects-section" id="contact">
        <div className="container">
          <h2 className="section-title">Contato</h2>
          <div className="section-divider"></div>
          <p className="loading-text">Entre em contato comigo!</p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            {/* Lembre-se de colocar seu e-mail real aqui */}
            <a href="mailto:guilherme.romero074@gmail.com" className="btn btn-primary">Enviar E-mail</a>
          </div>
        </div>
      </section>
    </div>
  );
};