import { useState, useEffect } from 'react';
import { gitHubStatsApi } from '../services/api';
import type { GitHubStats } from '../types';
import './SkillsDashboard.css';

interface Props {
  selectedTechnology: string;
  onTechnologySelect: (technology: string) => void;
}

export const SkillsDashboard = ({ selectedTechnology, onTechnologySelect }: Props) => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await gitHubStatsApi.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas do GitHub:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="loading-text">Carregando dados do GitHub...</p>;
  }

  if (!stats) {
    return <p className="loading-text">Não foi possível carregar os dados.</p>;
  }

  // --- Esta é a correção ---
  // stats.linguagens já é um array ordenado vindo da API.
  // Apenas pegamos os 5 primeiros.
  const topLinguagens = stats.linguagens.slice(0, 5);

  return (
    <section className="skills-dashboard" id="skills">
      <div className="container">
        <h2 className="section-title">Habilidades e Estatísticas (GitHub)</h2>
        
        <div className="stats-cards">
          <div className="stat-card">
            <h3>{stats.totalRepositorios}</h3>
            <p>Repositórios Públicos</p>
          </div>
          <div className="stat-card">
            <h3>{stats.totalEstrelas}</h3>
            <p>Estrelas Recebidas</p>
          </div>
        </div>

        <div className="skills-filters">
          <p>Filtrar projetos por tecnologia:</p>
          <div className="skill-buttons">
            <button
              className={`skill-btn ${selectedTechnology === 'Todos' ? 'active' : ''}`}
              onClick={() => onTechnologySelect('Todos')}
            >
              Todos
            </button>
            
            {/* --- Esta é a correção na renderização --- */}
            {topLinguagens.map((lang) => (
              <button
                key={lang.key}
                className={`skill-btn ${selectedTechnology === lang.key ? 'active' : ''}`}
                onClick={() => onTechnologySelect(lang.key)}
              >
                {/* Usamos lang.key e lang.value */}
                {lang.key} ({lang.value})
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};