module.exports = app => {
    const contratos = require("../controllers/contrato.controller.js");
  
    var router = require("express").Router();    
  
    // Busca todos os contratos
    router.get("/", contratos.findAll);
  
    // Busca o contrato por ID
    router.get("/:id", contratos.findOne);

    //router.get("/busca/:numero", contratos.findContratoPessoaById);
  
    app.use('/api/contratos', router);
  };