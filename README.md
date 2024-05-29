# Encurtador de url - Teste Teddy
## Pré requisitos
- [NodeJS](https://nodejs.org/en/download/)
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
- Primeiramente é necessário criar uma instância do PostgreSQL usando o ```docker-compose.yaml``` usando o comando:
```bash
docker compose up -d
```
- Com o banco criado, basta utilizar o comando à seguir para iniciar a aplicação:
```bash
npm run start:dev
```
- A aplicação estará ouvindo a porta 3000 do seu localhost

- [Documentação do Swagger](http://localhost:3000/swagger)

## Testes unitários
  A aplicação possui testes unitários. Para rodar os testes, use o comando:
```bash
npm run test
```

## Variáveis ambiente
As variáveis ambiente necessárias são:
- DATABASE_URL - necessário para a conexão do banco de dados dependendo do ambiente que a aplicação está funcionando
- JWT_SECRET - necessário para manter uma diferença entre produção e outros ambientes na geração do JWT por uma questão de segurança


## Pontos de melhoria
- Api gateway como KrankeD 
- ferramenta para medir Logs e métricas
- Implementação Kubernetes e terraform
