using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GitHubStatsController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        // Classe interna ajustada para warnings
        private class GitHubRepo
        {
            public string name { get; set; } = string.Empty; // Define um valor padrão
            public string? language { get; set; } // Adiciona '?' para permitir nulo
            public int stargazers_count { get; set; }
        }

        public GitHubStatsController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> GetGitHubStats()
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("User-Agent", "GuigoDev-Portfolio-App");
            
            string userGuigoDev = "GuigoDev";
            string userOutraConta = "TheRomeroGuilherme"; 

            try
            {
                var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

                // Busca dados da Conta 1 (GuigoDev)
                var urlGuigoDev = $"https://api.github.com/users/{userGuigoDev}/repos?per_page=100";
                var streamGuigoDev = await client.GetStreamAsync(urlGuigoDev);
                var reposGuigoDev = await JsonSerializer.DeserializeAsync<List<GitHubRepo>>(streamGuigoDev, jsonOptions);

                // Busca dados da Conta 2 (TheRomeroGuilherme)
                var urlOutraConta = $"https://api.github.com/users/{userOutraConta}/repos?per_page=100";
                var streamOutraConta = await client.GetStreamAsync(urlOutraConta);
                var reposOutraConta = await JsonSerializer.DeserializeAsync<List<GitHubRepo>>(streamOutraConta, jsonOptions);

                // Tratamento de nulos (corrige warning)
                if (reposGuigoDev == null || reposOutraConta == null)
                {
                    return StatusCode(500, "Erro ao deserializar resposta do GitHub.");
                }

                // 3. Unifica e Processa os Dados
                var todosOsRepos = reposGuigoDev.Concat(reposOutraConta).ToList();

                var contagemLinguagens = todosOsRepos
                    .Where(r => r.language != null) // Filtra repositórios nulos
                    .GroupBy(r => r.language!)     // '!' informa ao C# que não é nulo
                    .ToDictionary(g => g.Key, g => g.Count()) 
                    .OrderByDescending(kv => kv.Value); 

                var totalEstrelas = todosOsRepos.Sum(r => r.stargazers_count);

                var stats = new
                {
                    TotalRepositorios = todosOsRepos.Count,
                    TotalEstrelas = totalEstrelas,
                    Linguagens = contagemLinguagens
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar dados do GitHub: {ex.Message}");
            }
        }
    }
}