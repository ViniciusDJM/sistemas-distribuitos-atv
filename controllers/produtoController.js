const db = require("../database/connection");

/**
 * Controller para gerenciar operações relacionadas aos produtos
 */
const produtoController = {
  /**
   * Lista todos os produtos
   */
  listarTodos: async (req, res) => {
    try {
      const produtos = await db("produto").select("*");
      return res.json(produtos);
    } catch (error) {
      console.error("Erro ao listar produtos:", error);
      return res.status(500).json({
        error: true,
        message: "Erro ao listar produtos",
      });
    }
  },

  /**
   * Busca um produto pelo ID
   */
  buscarPorId: async (req, res) => {
    const { id } = req.params;

    try {
      const produto = await db("produto").where({ id }).first();

      if (!produto) {
        return res.status(404).json({
          error: true,
          message: "Produto não encontrado",
        });
      }

      return res.json(produto);
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error);
      return res.status(500).json({
        error: true,
        message: "Erro ao buscar produto",
      });
    }
  },

  /**
   * Cria um novo produto
   */
  criar: async (req, res) => {
    const { nome, preco } = req.body;

    // Validação básica
    if (!nome || !preco) {
      return res.status(400).json({
        error: true,
        message: "Nome e preço são obrigatórios",
      });
    }

    // Validação do preço
    if (isNaN(preco) || preco <= 0) {
      return res.status(400).json({
        error: true,
        message: "O preço deve ser um número positivo",
      });
    }

    try {
      const [id] = await db("produto").insert({ nome, preco });

      return res.status(201).json({
        id,
        nome,
        preco,
        message: "Produto criado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      return res.status(500).json({
        error: true,
        message: "Erro ao criar produto",
      });
    }
  },

  /**
   * Atualiza um produto existente
   */
  atualizar: async (req, res) => {
    const { id } = req.params;
    const { nome, preco } = req.body;

    // Validação básica
    if (!nome && !preco) {
      return res.status(400).json({
        error: true,
        message: "Forneça pelo menos um campo para atualizar",
      });
    }

    // Validação do preço
    if (preco !== undefined && (isNaN(preco) || preco <= 0)) {
      return res.status(400).json({
        error: true,
        message: "O preço deve ser um número positivo",
      });
    }

    try {
      // Verifica se o produto existe
      const produtoExistente = await db("produto").where({ id }).first();
      if (!produtoExistente) {
        return res.status(404).json({
          error: true,
          message: "Produto não encontrado",
        });
      }

      // Monta objeto com campos para atualizar
      const dadosAtualizacao = {};
      if (nome) dadosAtualizacao.nome = nome;
      if (preco !== undefined) dadosAtualizacao.preco = preco;

      await db("produto").where({ id }).update(dadosAtualizacao);

      const produtoAtualizado = await db("produto").where({ id }).first();

      return res.json({
        ...produtoAtualizado,
        message: "Produto atualizado com sucesso",
      });
    } catch (error) {
      console.error(`Erro ao atualizar produto com ID ${id}:`, error);
      return res.status(500).json({
        error: true,
        message: "Erro ao atualizar produto",
      });
    }
  },

  /**
   * Remove um produto
   */
  remover: async (req, res) => {
    const { id } = req.params;

    try {
      // Verifica se o produto existe
      const produtoExistente = await db("produto").where({ id }).first();
      if (!produtoExistente) {
        return res.status(404).json({
          error: true,
          message: "Produto não encontrado",
        });
      }

      await db("produto").where({ id }).del();

      return res.json({
        message: "Produto removido com sucesso",
      });
    } catch (error) {
      console.error(`Erro ao remover produto com ID ${id}:`, error);
      return res.status(500).json({
        error: true,
        message: "Erro ao remover produto",
      });
    }
  },
};

module.exports = produtoController;
