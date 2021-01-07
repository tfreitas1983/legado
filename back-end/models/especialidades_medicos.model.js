module.exports = (sequelize, Sequelize) => {
    const Especialidades_Medicos = sequelize.define("especialidades_medicos", {
        
    }, { timestamps: false });
  
    return Especialidades_Medicos;
};