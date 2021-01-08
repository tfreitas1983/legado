const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.contratos = require("./contratos.model.js")(sequelize, Sequelize);
db.pessoas = require("./pessoas.model.js")(sequelize, Sequelize);
db.mensalidades = require("./mensalidades.model.js")(sequelize, Sequelize);
db.unidades = require("./unidades.model.js")(sequelize, Sequelize);
db.medicos = require("./medicos.model.js")(sequelize, Sequelize);
db.especialidades = require("./especialidades.model.js")(sequelize, Sequelize);
db.horarios = require("./horarios.model.js")(sequelize, Sequelize);
db.medicos_plantaos = require("./medicos_plantaos.model.js")(sequelize, Sequelize);
db.agendamentos = require("./agendamentos.model.js")(sequelize, Sequelize);
db.atendimentos = require("./atendimentos.model.js")(sequelize, Sequelize);

db.users_unidades = require("./users_unidades.model.js")(sequelize, Sequelize);
db.unidades_especialidades = require("./unidades_especialidades.model.js")(sequelize, Sequelize);
db.especialidades_medicos = require("./especialidades_medicos.model.js")(sequelize, Sequelize);
db.medicos_unidades = require("./medicos_unidades.model.js")(sequelize, Sequelize);
db.medicos_horarios = require("./medicos_horarios.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.unidades.belongsToMany(db.user, {
  through: "users_unidades",
  foreignKey: "unidadeId",
  otherKey: "userId"
});

db.user.belongsToMany(db.unidades, {
  through: "users_unidades",
  foreignKey: "userId",
  otherKey: "unidadeId"
});

db.contratos.hasMany(db.pessoas, { as: "pessoas" });
db.contratos.hasMany(db.mensalidades, { as: "mensalidades" });
db.unidades.hasMany(db.agendamentos, { as: "agendamentos" })
db.especialidades.hasMany(db.agendamentos, { as: "agendamentos" })
db.medicos.hasMany(db.agendamentos, { as: "agendamentos" })
db.horarios.hasMany(db.agendamentos, { as: "agendamentos" })
db.medicos_plantaos.hasMany(db.atendimentos, { as: "atendimentos" })
db.user.hasMany(db.agendamentos, { as: "agendamentos" })
db.user.hasMany(db.atendimentos, { as: "atendimentos" })

db.horarios.belongsToMany(db.medicos, { 
  through: 'medicos_horarios',
  as: 'medicos',
  foreignKey: 'horarioId'});

db.medicos.belongsToMany(db.horarios, { 
  through: 'medicos_horarios',
  as: 'horarios',
  foreignKey: 'medicoId'});

db.medicos.hasMany(db.medicos_horarios, {as: 'medicos_horarios'})
db.medicos_horarios.belongsTo(db.medicos , {as: 'medicos', foreignKey: 'medicoId'})
db.horarios.hasMany(db.medicos_horarios , {as: 'medicos_horarios'})
db.medicos_horarios.belongsTo(db.horarios, {as: 'horarios', foreignKey: 'horarioId'})


db.medicos.hasMany(db.medicos_plantaos, { as: "medicos_plantaos" })
db.medicos_plantaos.belongsTo(db.medicos, {
  foreignKey: "medicoId",
  as: 'medicos' })
db.unidades.hasMany(db.medicos_plantaos, { as: "medicos_plantaos" })
db.medicos_plantaos.belongsTo(db.unidades, {
  foreignKey: "unidadeId",
  as: 'unidades' })


db.atendimentos.belongsTo(db.agendamentos, {
  foreignKey: "agendamentoId",
  as: "agendamentos"
})

db.atendimentos.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
})

db.atendimentos.belongsTo(db.medicos_plantaos, {
  foreignKey: "medicosPlantaoId",
  as: "medicos_plantaos",
});

db.agendamentos.belongsTo(db.unidades, {
  foreignKey: "unidadeId",
  as: "unidades",
});

db.agendamentos.belongsTo(db.especialidades, {
  foreignKey: "especialidadeId",
  as: "especialidades",
});

db.agendamentos.belongsTo(db.medicos, {
  foreignKey: "medicoId",
  as: "medicos",
});

db.agendamentos.belongsTo(db.horarios, {
  foreignKey: "horarioId",
  as: "horarios",
});




db.agendamentos.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

db.pessoas.belongsTo(db.contratos, {
    foreignKey: "contratoId",
    as: "contrato",
});

db.mensalidades.belongsTo(db.contratos, {
    foreignKey: "contratoId",
    as: "contrato",
});

db.medicos_plantaos.belongsTo(db.medicos, {
  foreignKey: "medicoId",
  as: "medico"
})

db.medicos_plantaos.belongsTo(db.unidades, {
  foreignKey: "unidadeId",
  as: "unidade"
})


db.unidades.belongsToMany(db.especialidades, { 
  through: 'unidades_especialidades', 
  as: "especialidades",
  foreignKey: 'unidadeId' });

db.especialidades.belongsToMany(db.unidades, { 
  through: 'unidades_especialidades', 
  as: 'unidades',
  foreignKey: 'especialidadeId' });

db.medicos.belongsToMany(db.especialidades, { 
  through: 'especialidades_medicos',
  as: 'especialidades',
  foreignKey: 'medicoId' });

db.especialidades.belongsToMany(db.medicos, { 
  through: 'especialidades_medicos',
  as: 'medicos',
  foreignKey: 'especialidadeId' });


  db.medicos.belongsToMany(db.unidades, { 
    through: 'medicos_unidades',
    as: 'unidades',
    foreignKey: 'medicoId' });
  
  db.unidades.belongsToMany(db.medicos, { 
    through: 'medicos_unidades',
    as: 'medicos',
    foreignKey: 'unidadeId' });



db.ROLES = ["user", "admin", "moderator"];

module.exports = db;