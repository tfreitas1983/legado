module.exports = (sequelize, Sequelize) => {
    const Horario = sequelize.define("horario", {
      hora: {
        type: Sequelize.TIME
      },
      status: {
        type: Sequelize.NUMBER,
      }
    });
  
    return Horario;
  };