module.exports = (sequelize, Sequelize) => {
    const Pessoa = sequelize.define("pessoa", {
      carteirinha: { type: Sequelize.INTEGER },
      nome: { type: Sequelize.STRING },
      dt_nascimento: { type: Sequelize.DATE },
      sexo: { type: Sequelize.STRING },
      rg: { type: Sequelize.INTEGER },
      cpf: { type: Sequelize.INTEGER },
      cep: { type: Sequelize.INTEGER },
      endereco: { type: Sequelize.STRING },
      numero: { type: Sequelize.STRING },
      complemento: { type: Sequelize.STRING },
      bairro: { type: Sequelize.STRING },
      cidade: { type: Sequelize.STRING },
      uf: { type: Sequelize.STRING },
      telefone: { type: Sequelize.STRING },
      celular: { type: Sequelize.STRING },
      celular2: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      parentesco: { type: Sequelize.STRING },
      obs: { type: Sequelize.STRING },
      condicao: { type: Sequelize.INTEGER },
      dt_inclusao: { type: Sequelize.DATE }
    });
  
    return Pessoa;
  };