import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { SkillsDashboard } from '../components/SkillsDashboard';
import { gitHubStatsApi } from '../services/api';
import type { GitHubRepoDTO } from '../types';
import './Home.css';

export const Home = () => {
  const [repos, setRepos] = useState<GitHubRepoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estado para o filtro (opcional, se quiser filtrar os repos do GitHub também)
  const [selectedTechnology, setSelectedTechnology] = useState('Todos');

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

  // Lógica de filtro simples para os repositórios (baseado na linguagem)
  const filteredRepos = selectedTechnology === 'Todos' 
    ? repos 
    : repos.filter(repo => repo.language === selectedTechnology);

  return (
    <div>
      <Hero />
      
      {/* O Dashboard controla o filtro "selectedTechnology" */}
      <SkillsDashboard 
        selectedTechnology={selectedTechnology} 
        onTechnologySelect={setSelectedTechnology} 
      />

      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Meus Projetos</h2>
          <div className="section-divider"></div>

          {loading ? (
            <p className="loading-text">Carregando projetos do GitHub...</p>
          ) : (
            <div className="repo-list">
              {filteredRepos.map(repo => (
                <a 
                  key={repo.id} 
                  href={repo.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="repo-card"
                >
                  <div className="repo-avatar">
                    <img src={repo.avatarUrl} alt="Avatar do proprietário" />
                  </div>
                  <div className="repo-info">
                    <span className="repo-name">{repo.title}</span>
                    {/* Mostra a linguagem se existir */}
                    <span className="repo-lang">
                      {repo.language !== "Outros" ? repo.language : ""}
                    </span>
                  </div>
                  {/* Ícone de seta para indicar que é clicável (opcional) */}
                  <div className="repo-arrow">&gt;</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};