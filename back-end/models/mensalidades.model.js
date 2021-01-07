module.exports = (sequelize, Sequelize) => {
    const Mensalidade = sequelize.define("mensalidade", {
      status: {
        type: Sequelize.STRING
      },
      dt_pagamento: {
        type: Sequelize.DATE
      },
      dt_vencimento: {
        type: Sequelize.DATE
      },
      dt_cobrador: {
        type: Sequelize.DATE
      },
      cobrador: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.FLOAT
      },
      valorpago: {
        type: Sequelize.FLOAT
      },
      num_recibo: {
        type: Sequelize.INTEGER
      }
    });
  
    return Mensalidade;
  };