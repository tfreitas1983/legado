module.exports = app => {
    const atendimentos = require("../controllers/atendimentos.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", atendimentos.findAll);
  
    router.get("/:id", atendimentos.findOne);

    router.post("/", atendimentos.cadastrar)
    
    router.put("/:id", atendimentos.editar)
  
    app.use('/api/atendimentos', router);
  };