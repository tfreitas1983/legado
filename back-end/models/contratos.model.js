module.exports = (sequelize, Sequelize) => {
    const Contrato = sequelize.define("contrato", {
      numero: {
        type: Sequelize.INTEGER
      },
      dt_venda: {
        type: Sequelize.DATE
      },
      vencimento: {
        type: Sequelize.DATE
      },
      unidade: {
        type: Sequelize.STRING
      },
      vendedor: {
        type: Sequelize.STRING
      },
      cobrador: {
        type: Sequelize.STRING
      }
    });
  
    return Contrato;
  };