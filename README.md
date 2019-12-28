<h1 align="center">Bem-vindo ao Gympoint 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Uma aplicação completa (backend, web e mobile) capaz de gerenciar academias. Desenvolvida para o Desafio Final do Bootcamp GoStack da **Rocketseat**. Utiliza Javascript como linguagem principal, sendo NodeJS para o código da API, ReactJS para a aplicação Web e React Native para a versão mobile.


### 🏠 [Homepage](https://github.com/homdreen/Gympoint)

## Instalação

Antes de tudo, é necessário instalar os pacotes das dependências. Em cada pasta principal (server, mobile, web), instale os pacotes utilizando:

```sh
yarn or npm install
```

## Utilização

Para rodar o aplicativo em modo de desenvolvimento, siga os seguintes passos:

### Backend

- Entre na pasta chamada `server`.
- Copie o arquivo `.env.example` para `.env` e adicione as informações necessárias.
- O sistema utiliza filas de execução para ordenar o envio de e-mails, para ativar estas filas utilize `yarn queue`.
- Para colocar o sistema em funcionamento, execute o comando `yarn dev`.

> Caso queira visualizar todas as rotas disponibilizadas na API, importe o arquivo de workspace `gympoint_api.json` para o software **Insomnia**, disponível para download em [insomnia.rest](https://insomnia.rest). Necessário configurar o ambiente, dentro do Insomnia, as variáveis `baseURL` e `token` (este pode ser utilizado do retorno da rota `/sessions`).

### Web

- Na pasta `web`.
- Se preferir, altere o endereço de loopback (localhost) no arquivo `./src/services/api.js` para um endereço IP válido em um rede NAT
- Rode o frontend web através do comando `yarn start`.
- Acesse através do navegador o endereço `http://localhost:3000`.

### Mobile

- Dentro da pasta `mobile`.
- Altere o endereço de IP localizado no arquivo `./src/services/api.js`, para o IP que está hospedando o backend (API).
- Como a versão mobile foi desenvolvida com **expo**, utilize o comando `expo start` (necessário estar instalada a expo-cli).
- Utilize a câmera do celular para identificar o QRCode capaz de localizar o aplicativo rodando.

### Containers

O sistema faz uso de dois containers:

- Postgres: `docker run --name NOME_DO_CONTAINER -e POSTGRES_PASSWORD=SENHA_DO_CONTAINER -e POSTGRES_DB=NOME_DA_BASE_DE_DADOS -p 5432:5432 -d postgres`
- Redis: `docker run --name NOME_DO_CONTAINER -p 6379:6379 -d -t redis:alpine`

As instruções de acesso devem ser inseridas no arquivo `.env` citado anteriormente.

Para subir estes containers utilize `docker start NOME_DO_CONTAINER`.

## Author

👤 **Felipe Homrich Melchior**

* Website: felipemelchior.com.br
* Github: [@homdreen](https://github.com/homdreen)
* LinkedIn: [@felipe-melchior](www.linkedin.com/in/felipe-melchior)

## Mostre seu apoio

Considere deixar uma ⭐️ se este repositório te ajudou!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
