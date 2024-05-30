# **Projeto API - Encurtador URL**
## Requisitos

- Node
- Docker e Docker compose

## Objetivo

API desenvolvida para teste de conhecimentos. 

O objetivo da api é crair um encurtador para usuários, onde o mesmo tem a opção de se cadastrar no sistema e com isso ter acesso a endpoints e detalhers sobre cada serviço utilizado.

A API foi desenvolvida com uma arquitetura bem definida e desacoplada, utilizando princípios do SOLID e toda documentação foi devidamente registrada no swagger.
<br /><br />

> ## APIs construídas no treinamento

1. Cadastro
2. Login
3. Criar encurtador url
4. Redirecionar usuário com url encurtada
4. Listagem de urls
5. Update url
6. Delete url

<br/>

>## Princípios

* Single Responsibility Principle (SRP)
* Open Closed Principle (OCP)
* Liskov Substitution Principle (LSP)
* Interface Segregation Principle (ISP)
* Dependency Inversion Principle (DIP)
* Keep It Simple, Silly (KISS)

>## Bibliotecas e Ferramentas

* NodeJS - node-version: 18
* TypeScript
* NestJS
* PrismaORM
* Class Validator | Class Transform
* Clean Architecture
* Github Actions
* Documentação Swagger
* Bcrypt
* JsonWebToken
* Docker
* PostgreSQL
* Husky pre e push-commit

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

## O que deve ser melhorado
- Api gateway como KrankeD 
- ferramenta para medir Logs e métricas
- Implementação Kubernetes e terraform
- Subir para cloud provider
