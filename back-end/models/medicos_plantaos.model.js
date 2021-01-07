module.exports = (sequelize, Sequelize) => {
    const Medicos_Plantaos = sequelize.define("medicos_plantaos", {
      dataPlantao: {
        type: Sequelize.DATE
      },
      horaChegada: {
        type: Sequelize.TIME
      },
      horaSaida: {
        type: Sequelize.TIME
      },
      consultorio: {
        type: Sequelize.NUMBER
      },
      status: {
        type: Sequelize.NUMBER
      }
    });
  
    return Medicos_Plantaos;
  };