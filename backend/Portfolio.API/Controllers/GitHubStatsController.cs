using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GitHubStatsController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        // Modelos para mapear o JSON que vem do GitHub
        private class GitHubRepo
        {
            public string name { get; set; } = string.Empty;
            public string? language { get; set; }
            public string? description { get; set; }
            public string? html_url { get; set; }
            public int stargazers_count { get; set; }
            public GitHubOwner? owner { get; set; }
        }

        private class GitHubOwner
        {
            public string avatar_url { get; set; } = string.Empty;
        }

        public GitHubStatsController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }
        private async Task<List<GitHubRepo>> FetchReposFromUser(HttpClient client, string user)
        {
            try 
            {
                var url = $"https://api.github.com/users/{user}/repos?per_page=100&sort=updated";
                var stream = await client.GetStreamAsync(url);
                var jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                var repos = await JsonSerializer.DeserializeAsync<List<GitHubRepo>>(stream, jsonOptions);
                return repos ?? new List<GitHubRepo>();
            }
            catch
            {
                // Se der erro em um usuário, retorna lista vazia para não quebrar o outro
                return new List<GitHubRepo>();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetGitHubStats()
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("User-Agent", "GuigoDev-Portfolio-App");

            try
            {
                var reposGuigo = await FetchReposFromUser(client, "GuigoDev");
                var reposRomero = await FetchReposFromUser(client, "TheRomeroGuilherme");

                var todosOsRepos = reposGuigo.Concat(reposRomero).ToList();

                var contagemLinguagens = todosOsRepos
                    .Where(r => r.language != null)
                    .GroupBy(r => r.language!)
                    .ToDictionary(g => g.Key, g => g.Count())
                    .OrderByDescending(kv => kv.Value);

                var stats = new
                {
                    TotalRepositorios = todosOsRepos.Count,
                    TotalEstrelas = todosOsRepos.Sum(r => r.stargazers_count),
                    Linguagens = contagemLinguagens
                };

                return Ok(stats);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar estatísticas: {ex.Message}");
            }
        }

        [HttpGet("repos")]
        public async Task<IActionResult> GetRepositories()
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Add("User-Agent", "GuigoDev-Portfolio-App");

            try
            {
                var reposGuigo = await FetchReposFromUser(client, "GuigoDev");
                var reposRomero = await FetchReposFromUser(client, "TheRomeroGuilherme");

                var todosOsRepos = reposGuigo.Concat(reposRomero)
                    .OrderByDescending(r => r.stargazers_count) // Ordena por popularidade
                    .ToList();

                // Mapeia para o formato que o frontend precisa
                var resultado = todosOsRepos.Select(r => new 
                {
                    Id = Guid.NewGuid(),
                    Title = r.name,
                    Description = r.description ?? "Sem descrição disponível.",
                    Url = r.html_url,
                    Language = r.language ?? "Outros",
                    AvatarUrl = r.owner?.avatar_url ?? ""
                });

                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao buscar repositórios: {ex.Message}");
            }
        }
    }
}