# Estágio de Compilação
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["Portfolio.API.csproj", "./"]
RUN dotnet restore "Portfolio.API.csproj"
COPY . .
RUN dotnet publish "Portfolio.API.csproj" -c Release -o /app/publish

# Estágio de Execução
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
# O Render usa a porta 8080
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "Portfolio.API.dll"]