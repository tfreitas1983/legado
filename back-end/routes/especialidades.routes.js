module.exports = app => {
    const especialidades = require("../controllers/especialidades.controller.js");
  
    var router = require("express").Router();    
  
    // Busca todos os contratos
    router.get("/", especialidades.findAll );
  
    // Busca o contrato por ID
    router.get("/:id", especialidades.findOne );

    //router.get("/busca/:numero", contratos.findContratoPessoaById);
  
    app.use('/api/especialidades', router);
  };