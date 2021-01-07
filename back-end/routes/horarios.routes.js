module.exports = app => {
    const horarios = require("../controllers/horarios.controller.js");
  
    var router = require("express").Router();    
  
    // Busca todos os contratos
    router.get("/", horarios.findAll );
  
    // Busca o contrato por ID
    router.get("/:id", horarios.findOne );

    //router.get("/busca/:numero", contratos.findContratoPessoaById);
  
    app.use('/api/horarios', router);
  };