module.exports = app => {
    const unidades = require("../controllers/unidades.controller.js");
  
    var router = require("express").Router();    
  
    // Busca todos os contratos
    router.get("/", unidades.findAll);
  
    // Busca o contrato por ID
    router.get("/:id", unidades.findOne);

    //router.get("/busca/:numero", contratos.findContratoPessoaById);
  
    app.use('/api/unidades', router);
  };