using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using System.Text.Json; // 1. Importar

var builder = WebApplication.CreateBuilder(args);

// Configurar SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=portfolio.db"));

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:5173", "http://localhost:3000", "http://localhost:5174")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddHttpClient();

// 2. Adicionar configuração de Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // 3. Configurar JSON para usar camelCase
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

var app = builder.Build();

app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();

app.Run();