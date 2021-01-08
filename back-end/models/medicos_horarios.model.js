module.exports = (sequelize, Sequelize) => {
    const Medicos_Horarios = sequelize.define("medicos_horarios", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        diaSemana: Sequelize.NUMBER,
        qnt: Sequelize.NUMBER,
        status: Sequelize.NUMBER
    }, { timestamps: false });
  
    return Medicos_Horarios;
};
