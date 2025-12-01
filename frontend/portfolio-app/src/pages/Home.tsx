import { useState, useEffect } from 'react';
import { Hero } from '../components/Hero';
import { ProjectCard } from '../components/ProjectCard';
import { SkillsDashboard } from '../components/SkillsDashboard';
import { projectsApi } from '../services/api';
import type { Project } from '../types';
import './Home.css';

export const Home = () => {
  // --- Nossos novos estados ---
  const [allProjects, setAllProjects] = useState<Project[]>([]); // Guarda *todos* os projetos
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]); // Guarda os projetos *filtrados*
  const [loading, setLoading] = useState(true);
  const [selectedTechnology, setSelectedTechnology] = useState('Todos'); // Guarda o filtro ativo

  // 1. Busca os projetos da API apenas uma vez
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await projectsApi.getAll();
        setAllProjects(response.data); // Define a lista "mestra"
        setFilteredProjects(response.data); // Define a lista a ser exibida (inicialmente todos)
      } catch (error) {
        console.error('Erro ao carregar projetos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // 2. Este "efeito" roda toda vez que o filtro (selectedTechnology) muda
  useEffect(() => {
    if (selectedTechnology === 'Todos') {
      setFilteredProjects(allProjects); // Mostra todos os projetos
    } else {
      // Filtra os projetos
      const filtered = allProjects.filter(project =>
        project.technologies
          .split(',') // Ex: "React, .NET, C#"
          .map(tech => tech.trim().toLowerCase()) // Ex: ["react", ".net", "c#"]
          .includes(selectedTechnology.toLowerCase()) // Verifica se a tecnologia está na lista
      );
      setFilteredProjects(filtered);
    }
  }, [selectedTechnology, allProjects]); // Depende de mudanças no filtro ou na lista mestra

  return (
    <div>
      <Hero />
      
      {/* Passamos o filtro ativo e a função para mudá-lo para o Dashboard */}
      <SkillsDashboard
        selectedTechnology={selectedTechnology}
        onTechnologySelect={setSelectedTechnology}
      />

      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Meus Projetos</h2>
          {loading ? (
            <p className="loading-text">Carregando projetos...</p>
          ) : filteredProjects.length === 0 ? ( // 3. Mostra a lista filtrada
            <p className="no-projects">Nenhum projeto encontrado com essa tecnologia.</p>
          ) : (
            <div className="projects-grid">
              {/* 4. Renderiza apenas os projetos filtrados */}
              {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};