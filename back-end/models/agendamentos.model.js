module.exports = (sequelize, Sequelize) => {
    const Agendamento = sequelize.define("agendamento", {
      paciente: {
        type: Sequelize.STRING
      },
      contrato: {
        type: Sequelize.STRING,
      },
      dataAgendamento: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.NUMBER,
      },
    });
  
    return Agendamento;
  };