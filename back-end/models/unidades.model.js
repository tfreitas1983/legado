module.exports = (sequelize, Sequelize) => {
    const Unidade = sequelize.define("unidade", {
      descricao: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
      }
    });
  
    return Unidade;
  };