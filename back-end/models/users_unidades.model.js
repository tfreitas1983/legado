module.exports = (sequelize, Sequelize) => {
    const Users_Unidades= sequelize.define("users_unidades", {
        
    }, { timestamps: false });
  
    return Users_Unidades;
  };


