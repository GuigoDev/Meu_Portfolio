import axios from 'axios';
import type { Project, Skill, Experience, GitHubStats } from '../types';

const baseURL = import.meta.env.PROD
  ? 'https://meu-protfolio.onrender.com'
  : 'http://localhost:5100/api';

const api = axios.create({
  baseURL: baseURL
});

export const projectsApi = {
  getAll: () => api.get<Project[]>('/projects'),
  getById: (id: number) => api.get<Project>(`/projects/${id}`),
  create: (project: Omit<Project, 'id' | 'createdAt'>) => api.post<Project>('/projects', project)
};

export const skillsApi = { getAll: () => api.get<Skill[]>('/skills') };
export const experiencesApi = { getAll: () => api.get<Experience[]>('/experiences') };
export const gitHubStatsApi = {
  getStats: () => api.get<GitHubStats>('/githubstats'),
  getRepos: () => api.get<GitHubRepoDTO[]>('/githubstats/repos')
};
