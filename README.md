# Encurtador de url - Teste Teddy
## Pré requisitos

- [Docker e Docker Compose](https://docs.docker.com/engine/install/)

## O que foi utilizado:
- NodeJS
- TypeScript
- NestJS
- PrismaORM
- Class Validator | Class Transform
- Clean Architecture
- Github Actions
- Documentação Swagger

## Como rodar a aplicação
- Projeto está conteinerizado, basta apenas buildar as imagens com
```docker compose ``` usando o comando:
```
docker compose up --build
```
- projeto ouvindo na porta 3000 do localhost

- A documentação está no end-point: http://localhost:3000/api
- [Documentação do Swagger](http://localhost:3000/api)

## Testes unitários
  A aplicação possui testes unitários. Para rodar os testes, use o comando:
```
npm run test
```

## Pontos de melhoria
- Api gateway como KrankeD 
- ferramenta para medir Logs e métricas
- Implementação Kubernetes e terraform
