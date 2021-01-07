module.exports = (sequelize, Sequelize) => {
    const Especialidade = sequelize.define("especialidade", {
      especialidade: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.NUMBER,
      }
    });
  
    return Especialidade;
  };