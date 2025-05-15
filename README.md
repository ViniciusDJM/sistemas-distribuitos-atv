# API REST - Produtos e Clientes

API REST básica para gerenciamento de produtos e clientes construída com Node.js, Express e MySQL.

## Tecnologias Utilizadas

- Node.js
- Express
- Knex.js (Query Builder)
- MySQL
- dotenv

## Estrutura do Projeto

```
├── app.js
├── package.json
├── .env
├── controllers
│   ├── clienteController.js
│   └── produtoController.js
├── database
│   ├── connection.js
│   └── setup.sql
└── routes
    ├── cliente.js
    └── produto.js
```

## Requisitos

- Node.js
- MySQL

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=api_db
   DB_PORT=3306
   PORT=3000
   ```
4. Execute o script SQL para criar o banco de dados e tabelas:
   ```
   mysql -u seu_usuario -p < database/setup.sql
   ```

## Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento:

```
npm run dev
```

Para iniciar o servidor em modo de produção:

```
npm start
```

## Rotas Disponíveis

### Produto

- `GET /produtos`: Lista todos os produtos
- `GET /produtos/:id`: Busca um produto pelo ID
- `POST /produtos`: Cria um novo produto
- `PUT /produtos/:id`: Atualiza um produto existente
- `DELETE /produtos/:id`: Remove um produto

### Cliente

- `GET /clientes`: Lista todos os clientes
- `GET /clientes/:id`: Busca um cliente pelo ID
- `POST /clientes`: Cria um novo cliente
- `PUT /clientes/:id`: Atualiza um cliente existente
- `DELETE /clientes/:id`: Remove um cliente

## Padrão Singleton

A conexão com o banco de dados utiliza o padrão Singleton, garantindo que apenas uma instância da conexão seja criada e reutilizada em toda a aplicação.
