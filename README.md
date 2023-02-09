<h1 align="center"> API Rentx </h1>

<p align="center">
  <img width="200" height="200" src="https://github.com/kaiomoreira-dev/api-rentx/blob/main/img-rentx.png">
</p>

## Summary
- [Intro](#intro)
- [Description](#description)
- [Pré-requisitos](#pré-requisitos)
- [Diagrama](#diagram)
- [Acesso ao projeto](#project-access)
- [Open && Run](#open--run)
- [Status](#status)
- [Techniques && Technologies](#techniques--technologies)
- [Owner](#owner)

## Intro
* Rentx é uma API REST monolítica desenvolvida para criar locação de carros. Desenvolvido
como projeto acadêmico junto a Rockeseat dentro do programa Ignite.

## Description
* Diante da API Rentx foram desenvolvidas atividades como criar instância EC2, criar e
configurar serviço DNS route53, criar armazenamento S3, configurar serviço de e-mail SES
utilizando Amazon Web Service. Sistema de autenticação de usuário usando jwt contendo
refresh token. Modelagem de dados, relacionamento, migrations para versionamento de
base de dado utilizando typeORM. Criar testes de integração e unidade utilizando jest.
Docker para criar containers contendo base de dados e aplicação. Docker-compose para
criar serviços orquestrador. Babel para traspilar o código. Funções middlewares para
segurança. Princípios SOLID SRP, LSK e DIP. Sentry para monitoramento de erros.
Modelagem de useCases com conceitos UML. Conceitos, boas práticas com JavaScript e
Typescript. Servidores criados com Express. Scripts CLI automatizados. Manipulação de
arquivos, diretórios e nome de arquivos. Tratamento de async-erros. Arquiteturas como
REST e monolítica. Git Actions para automatização CI/CD. Injeção de dependência.
PostgreSQL para modelagens relacionais. Singleton como design patterns. Desenvolvimento
de estrutura escalável por camadas.

## Pré-requisitos
* Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Node.js](https://nodejs.org/en/). 
E o banco de dados Postgres:
[Postgres](https://www.postgresql.org/).
E o docker para utilizar docker-compose para subir o container do Postgres
[Docker](https://https://www.docker.com/).
E instalar o docker-compose pra subir o container.
[Docker-Compose](https://docs.docker.com/compose/install/).
Além disto é bom ter um editor para trabalhar com o código como 
[VSCode](https://code.visualstudio.com/).

## Diagram
![diagram-rentx](./diagrama.png)

## Project access

### Open && Run
```bash
# Clone este repositório
$ git clone <https://github.com/kaiomoreira-dev/api-rentx.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd rentx

# Instale as dependências
$ yarn ou npm install


# Exutar apenas o container do postgres
$ docker-compose up -d

# Rodar as mirgations do banco
$ yarn migrations

# Build do projeto
$ yarn build

## Iniciar aplicação

// desenvolvimento
$ yarn dev ou npm run dev

// teste
$ yarn test ou npm run test

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>

# O banco de dados do postgres fica no docker na porta 5432:5432
```
## Status 
* Aplicação finalizada devido ao término das atividades acadêmicas. Tendo como objetivo concretizar ensinamentos e o denvolvimento profissional.


## Techniques && Technologies

* ![Typescript](https://img.shields.io/badge/-Typescript-%234F4F4F)
* ![TypeORM](https://img.shields.io/badge/-TypeORM-%234F4F4F)
* ![Node.js](https://img.shields.io/badge/-Node.js-%234F4F4F)
* ![Express](https://img.shields.io/badge/-Express-%234F4F4F)
* ![Princípios SOLID](https://img.shields.io/badge/-Princ%C3%ADpios%20SOLID-%234F4F4F)
* ![Modelagem UML](https://img.shields.io/badge/-Modelagem%20UML-%234F4F4F)
* ![CI/CD](https://img.shields.io/badge/-CI%2FCD-%234F4F4F)
* ![Git](https://img.shields.io/badge/-Git-%234F4F4F)
* ![Github](https://img.shields.io/badge/-Github-%234F4F4F)
* ![API REST design](https://img.shields.io/badge/-API%20REST%20design-%234F4F4F)
* ![Design Pattern](https://img.shields.io/badge/-Design%20Pattern-%234F4F4F)
* ![Docker](https://img.shields.io/badge/-Docker-%234F4F4F)
* ![AWS](https://img.shields.io/badge/-AWS-%234F4F4F)
* ![Swagger](https://img.shields.io/badge/-Swagger-%09%234F4F4F)
* ![Jest](https://img.shields.io/badge/-Jest-%234F4F4F)
* ![Test unitário](https://img.shields.io/badge/-Test%20unit%C3%A1rio-%234F4F4F)
* ![Test de integração](https://img.shields.io/badge/-Test%20de%20integra%C3%A7%C3%A3o-%234F4F4F)

# Owner
[<img src="https://avatars.githubusercontent.com/u/56137536?s=400&u=a74073f1d0f605815a4f343436c791ab7b7dc184&v=4" width=115><br><sub>Kaio Moreira</sub>](https://github.com/kaiomoreira-dev)

[<img src="https://avatars.githubusercontent.com/u/69590972?s=200&v=4" width=115><br><sub>Rocketseat</sub>](https://github.com/rocketseat-education)
