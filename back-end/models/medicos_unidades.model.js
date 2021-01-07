module.exports = (sequelize, Sequelize) => {
    const Medicos_Unidades = sequelize.define("medicos_unidades", {
        status: Sequelize.NUMBER
    }, { timestamps: false });
  
    return Medicos_Unidades;
};