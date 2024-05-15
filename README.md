# Breakfast

Este projeto foi feito em Angular versão 14.2.0.

## Iniciar Projeto

Para iniciar o projeto, siga os passos abaixo:

1. Abra o terminal na pasta raiz do projeto e execute o comando `npm install` para instalar todas as dependências do projeto.

2. Configuração do pré-commit (utilizando Husky):

    2.1. Após a instalação das dependências, execute o comando: `npm run prepare`.

    2.2. Em seguida, execute o seguinte comando para configurar o pré-commit usando Husky: `npx husky add .husky/pre-commit "npm run lint"`

## Servidor de Desenvolvimento

Para executar o servidor de desenvolvimento, utilize o comando: `npm start`

Isso iniciará o servidor local em http://localhost:4200/. O aplicativo será recarregado automaticamente sempre que você fizer alterações nos arquivos de origem.

## Executando Testes de Unidade

Para rodar os testes de unidade utilizando Jest, execute o seguinte comando: `npm test`

## Ajuda Adicional

Para obter mais informações sobre o Angular CLI e seus comandos, consulte a página Visão Geral do Angular CLI e Referência de Comandos. Se você precisar de ajuda adicional, você pode usar o comando `ng help` para obter mais informações e recursos de ajuda relacionados ao Angular CLI.
