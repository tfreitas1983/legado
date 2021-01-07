module.exports = app => {
    const agendamentos = require("../controllers/agendamento.controller.js");
  
    var router = require("express").Router();    
  
    // Busca todos os contratos
    router.get("/", agendamentos.findAll);
  
    // Busca o contrato por ID
    router.get("/:id", agendamentos.findOne);

    router.post("/", agendamentos.cadastrar)
    
    router.put("/:id", agendamentos.editar)
  
    app.use('/api/agendamentos', router);
  };