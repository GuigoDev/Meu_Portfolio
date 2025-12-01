using Microsoft.EntityFrameworkCore;
using Portfolio.API.Data;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=portfolio.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddHttpClient();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });

var app = builder.Build();

app.UseCors("AllowReact");
app.UseAuthorization();
app.MapControllers();

app.Run();