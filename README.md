# Portfólio Full-Stack - Guilherme Romero (GuigoDev)

Este é o repositório do meu portfólio profissional, um projeto full-stack desenvolvido para demonstrar minhas habilidades em desenvolvimento web moderno, conectando um backend robusto em C# .NET com um frontend interativo em React.

O projeto original (HTML/CSS simples) evoluiu para esta arquitetura para melhor refletir minhas competências atuais.

![Preview do Portfólio](caminho/para/sua/imagem.png)
*(Dica: Tire um print do seu site rodando e adicione aqui!)*

---

## 🚀 Tecnologias Utilizadas

Este projeto é dividido em duas partes principais: a API (backend) e a aplicação (frontend).

### Backend (API)

* **C#** e **.NET 9**: A base da API, fornecendo endpoints RESTful.
* **ASP.NET Core 9**: Framework para a construção da API.
* **Entity Framework Core 9**: ORM para comunicação com o banco de dados.
* **SQLite**: Banco de dados leve e local utilizado para desenvolvimento.

### Frontend (Aplicação)

* **React 19**: Biblioteca principal para a construção da interface de usuário.
* **TypeScript**: Para adicionar tipagem estática e robustez ao JavaScript.
* **Vite**: Ferramenta de build e servidor de desenvolvimento de alta performance.
* **Axios**: Cliente HTTP para fazer as chamadas à API .NET.
* **CSS Puro**: Para estilização dos componentes.

---

## ⚙️ Como Rodar o Projeto Localmente

Para executar o projeto, você precisará de dois terminais rodando simultaneamente.

**Pré-requisitos:**
* SDK do .NET 9 (ou superior)
* Node.js (v20 ou superior)

### 1. Terminal 1: Backend (API)

```bash
# Navegue até a pasta da API
cd backend/Portfolio.API

# Instale as dependências (se for a primeira vez)
dotnet restore

# Execute o projeto
dotnet run

A API estará rodando em http://localhost:5100.

2. Terminal 2: Frontend (React)
Bash

# Em um novo terminal, navegue até a pasta do frontend
cd frontend/portfolio-app

# Instale as dependências (se for a primeira vez)
npm install

# Execute o servidor de desenvolvimento
npm run dev
A aplicação estará acessível em http://localhost:5173.