module.exports = app => {
    const medicos = require("../controllers/medicos.controller.js");
  
    var router = require("express").Router();    
  
    // Busca todos os contratos
    router.get("/", medicos.findAll );
  
    // Busca o contrato por ID
    router.get("/:id", medicos.findOne );

    //router.get("/busca/:numero", contratos.findContratoPessoaById);
  
    app.use('/api/medicos', router);
  };