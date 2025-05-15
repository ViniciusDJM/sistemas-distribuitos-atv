const db = require("../database/connection");

/**
 * Controller para gerenciar operações relacionadas aos clientes
 */
const clienteController = {
  /**
   * Lista todos os clientes
   */
  listarTodos: async (req, res) => {
    try {
      const clientes = await db("cliente").select("*");
      return res.json(clientes);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      return res.status(500).json({
        error: true,
        message: "Erro ao listar clientes",
      });
    }
  },

  /**
   * Busca um cliente pelo ID
   */
  buscarPorId: async (req, res) => {
    const { id } = req.params;

    try {
      const cliente = await db("cliente").where({ id }).first();

      if (!cliente) {
        return res.status(404).json({
          error: true,
          message: "Cliente não encontrado",
        });
      }

      return res.json(cliente);
    } catch (error) {
      console.error(`Erro ao buscar cliente com ID ${id}:`, error);
      return res.status(500).json({
        error: true,
        message: "Erro ao buscar cliente",
      });
    }
  },

  /**
   * Cria um novo cliente
   */
  criar: async (req, res) => {
    const { nome, email } = req.body;

    // Validação básica
    if (!nome || !email) {
      return res.status(400).json({
        error: true,
        message: "Nome e email são obrigatórios",
      });
    }

    try {
      // Verifica se o email já existe
      const emailExistente = await db("cliente").where({ email }).first();
      if (emailExistente) {
        return res.status(400).json({
          error: true,
          message: "Este email já está em uso",
        });
      }

      const [id] = await db("cliente").insert({ nome, email });

      return res.status(201).json({
        id,
        nome,
        email,
        message: "Cliente criado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return res.status(500).json({
        error: true,
        message: "Erro ao criar cliente",
      });
    }
  },

  /**
   * Atualiza um cliente existente
   */
  atualizar: async (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;

    // Validação básica
    if (!nome && !email) {
      return res.status(400).json({
        error: true,
        message: "Forneça pelo menos um campo para atualizar",
      });
    }

    try {
      // Verifica se o cliente existe
      const clienteExistente = await db("cliente").where({ id }).first();
      if (!clienteExistente) {
        return res.status(404).json({
          error: true,
          message: "Cliente não encontrado",
        });
      }

      // Verifica se o email já existe (se estiver atualizando o email)
      if (email && email !== clienteExistente.email) {
        const emailExistente = await db("cliente").where({ email }).first();
        if (emailExistente) {
          return res.status(400).json({
            error: true,
            message: "Este email já está em uso",
          });
        }
      }

      // Monta objeto com campos para atualizar
      const dadosAtualizacao = {};
      if (nome) dadosAtualizacao.nome = nome;
      if (email) dadosAtualizacao.email = email;

      await db("cliente").where({ id }).update(dadosAtualizacao);

      const clienteAtualizado = await db("cliente").where({ id }).first();

      return res.json({
        ...clienteAtualizado,
        message: "Cliente atualizado com sucesso",
      });
    } catch (error) {
      console.error(`Erro ao atualizar cliente com ID ${id}:`, error);
      return res.status(500).json({
        error: true,
        message: "Erro ao atualizar cliente",
      });
    }
  },

  /**
   * Remove um cliente
   */
  remover: async (req, res) => {
    const { id } = req.params;

    try {
      // Verifica se o cliente existe
      const clienteExistente = await db("cliente").where({ id }).first();
      if (!clienteExistente) {
        return res.status(404).json({
          error: true,
          message: "Cliente não encontrado",
        });
      }

      await db("cliente").where({ id }).del();

      return res.json({
        message: "Cliente removido com sucesso",
      });
    } catch (error) {
      console.error(`Erro ao remover cliente com ID ${id}:`, error);
      return res.status(500).json({
        error: true,
        message: "Erro ao remover cliente",
      });
    }
  },
};

module.exports = clienteController;
