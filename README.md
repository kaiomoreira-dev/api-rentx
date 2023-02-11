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
* Rentx é uma API REST monolítico desenvolvida para criar locação de carros. Desenvolvido
como projeto acadêmico junto a Rockeseat dentro do programa Ignite.

## Description
* Diante da API Rentx desenvolveu e utilizou aplicação com uma estrutura monolítica colocando em
produção, configurou protocolo de rede, criou armazenamento de arquivos, serviço envio de e-mail. Desenvolveu sistema de autenticação de usuário com refresh-token, modelou de dados e  relacionamento, criou versionamento da base de dado, testou regra de negócios e fluxo I/O, criou serviços para orquestrar containers, configurou conversor de código em JavaScript, criou funções de segurança, documentou rotas, utilizou acrônimos para responsabilidade única, substituição de serviço e uso de hierarquia, monitorou e tratou de erros, modelou use cases, utilizou conceitos e boas práticas na linguagem de programação, manipulou arquivos, diretórios e nome de arquivos, automatizou atualizações, formatou datas, criptografou informações, utilizou banco de dados relacional, desacoplou módulos, restringiu dados sensíveis e desenvolveu estrutura escalável por camadas. Com isso, adquiriu experiência para criar aplicações desde o ambiente de desenvolvimento até em produção. Criou habilidades de comportamento significativa para o desenvolvimento 
profissional como programador com resultados de 9 a 10 nos desafios acadêmicos.

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
* ![UML](https://img.shields.io/badge/-UML-grey)
* ![CI/CD](https://img.shields.io/badge/-CI%2FCD-grey)
* ![Git](https://img.shields.io/badge/-Git-%234F4F4F)
* ![Github](https://img.shields.io/badge/-Github-%234F4F4F)
* ![Git Actions](https://img.shields.io/badge/-Git%20Actions-grey)
* ![REST](https://img.shields.io/badge/-REST-grey)
* ![Design Pattern](https://img.shields.io/badge/-Design%20Pattern-%234F4F4F)
* ![Docker](https://img.shields.io/badge/-Docker-%234F4F4F)
* ![AWS](https://img.shields.io/badge/-AWS-%234F4F4F)
* ![Swagger](https://img.shields.io/badge/-Swagger-%09%234F4F4F)
* ![Jest](https://img.shields.io/badge/-Jest-%234F4F4F)
* ![EC2](https://img.shields.io/badge/-EC2-grey)
* ![S3](https://img.shields.io/badge/-S3-grey)
* ![Route53](https://img.shields.io/badge/-Route53-grey)
* ![SES](https://img.shields.io/badge/-SES-grey)
* ![Ethereal](https://img.shields.io/badge/-Ethereal-grey)
* ![Padrão de Desenvolvimento de Software](https://img.shields.io/badge/-Padr%C3%A3o%20de%20Desenvolvimento%20de%20Software-grey)
* ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-grey)
* ![CLI](https://img.shields.io/badge/-CLI-grey)
* ![Scripts](https://img.shields.io/badge/-Scripts-grey)
* ![Migration](https://img.shields.io/badge/-Migration-grey)
* ![UML](https://img.shields.io/badge/-UML-grey)
* ![Babel](https://img.shields.io/badge/-Babel-grey)
* ![Async-errors](https://img.shields.io/badge/-Async--errors-grey)
* ![CRUD](https://img.shields.io/badge/-CRUD-grey)
* ![Deploy](https://img.shields.io/badge/-Deploy-grey)


# Owner
[<img src="https://avatars.githubusercontent.com/u/56137536?s=400&u=a74073f1d0f605815a4f343436c791ab7b7dc184&v=4" width=115><br><sub>Kaio Moreira</sub>](https://github.com/kaiomoreira-dev)

[<img src="https://avatars.githubusercontent.com/u/69590972?s=200&v=4" width=115><br><sub>Rocketseat</sub>](https://github.com/rocketseat-education)
