module.exports = (sequelize, Sequelize) => {
    const Unidades_Especialidades = sequelize.define("unidades_especialidades", {
        
    }, { timestamps: false });
  
    return Unidades_Especialidades;
  };


