module.exports = (sequelize, Sequelize) => {
    const Medico = sequelize.define("medico", {
      nome: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
      }
    });
  
    return Medico;
  };