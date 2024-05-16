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

