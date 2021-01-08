module.exports = app => {
    const medicos = require("../controllers/medicos.controller.js");
  
    var router = require("express").Router();    
  
    // Busca todos os contratos
    router.get("/", medicos.findAll );
  
    // Busca o contrato por ID
    router.get("/:id", medicos.findOne );

    //router.get("/busca/:numero", contratos.findContratoPessoaById);
    router.post("/", medicos.cadastrar)
    router.post("/unidades/", medicos.addUnidade)
    router.post("/especialidades/", medicos.addEspecialidade)
    router.post("/horarios/", medicos.addHorario)
    
  
    app.use('/api/medicos', router);
  };