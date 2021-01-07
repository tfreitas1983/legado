module.exports = app => {
    const medicosPlantao = require("../controllers/medicosPlantao.controller.js");
  
    var router = require("express").Router();    
   
    router.get("/", medicosPlantao.findAll);
  
    router.get("/:id", medicosPlantao.findOne);

    router.post("/", medicosPlantao.cadastrar)
    
    router.put("/:id", medicosPlantao.editar)
  
    app.use('/api/medicosplantao', router);
  };