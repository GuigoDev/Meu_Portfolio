export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  createdAt: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
}

export interface GitHubStats {
  totalRepositorios: number;
  totalEstrelas: number;
  linguagens: {
    key: string;
    value: number;
  }[]; 
}

export interface GitHubRepoDTO {
  id: string;
  title: string;
  description: string;
  url: string;
  language: string;
  avatarUrl: string;
}