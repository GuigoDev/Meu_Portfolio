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

// --- Esta é a correção ---
export interface GitHubStats {
  totalRepositorios: number;
  totalEstrelas: number;
  linguagens: {
    key: string;
    value: number;
  }[]; // Deve ser um ARRAY de objetos { key: string, value: number }
}