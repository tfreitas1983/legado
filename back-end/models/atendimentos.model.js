module.exports = (sequelize, Sequelize) => {
    const Atendimento = sequelize.define("atendimento", {
      senha: {
        type: Sequelize.STRING
      },
      encaixe: {
        type: Sequelize.BOOLEAN,
      },
      prontuario: {
        type: Sequelize.BOOLEAN,
      },
      horaChegada: {
        type: Sequelize.TIME,
      },
      status: {
        type: Sequelize.NUMBER,
      },
    });
  
    return Atendimento;
  };