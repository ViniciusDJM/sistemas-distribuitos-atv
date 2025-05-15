-- Este arquivo contém os comandos SQL para criar as tabelas do banco de dados

-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS api_db;

USE api_db;

-- Cria a tabela de produto
CREATE TABLE IF NOT EXISTS produto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  preco DECIMAL(10,2) NOT NULL
);

-- Cria a tabela de cliente
CREATE TABLE IF NOT EXISTS cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE
);

-- Adicione dados iniciais (opcional)
INSERT INTO produto (nome, preco) VALUES 
  ('Smartphone', 1299.99),
  ('Notebook', 3599.99),
  ('Fone de Ouvido', 199.99);

INSERT INTO cliente (nome, email) VALUES 
  ('João Silva', 'joao@email.com'),
  ('Maria Oliveira', 'maria@email.com'),
  ('Pedro Santos', 'pedro@email.com');