const { response, query } = require("express");
const db = require("../models");
const Op = db.Sequelize.Op;
const MedicosPlantao = db.medicos_plantaos;

exports.findAll = (req, res) => { 
    MedicosPlantao.findAll()
    //Contrato.findAll({query})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar os plantões."
        });
      });
};


//Pega o plantão por ID
exports.findOne = (req, res) => {
    const id = req.params.id
  
    return MedicosPlantao.findByPk(id, { include: ["medicos", "unidades"] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar o plantão: ", err);
      });   
  };

  exports.cadastrar = (req, res) => {
    
    if (!req.body.horaChegada && !req.body.dataPlantao ) {
      res.status(400).send({
        message: "A data e hora que o médico chegou deve ser preenchida!",
        id: res.id,
        horaSaida: res.horaSaida,
        horaChegada: res.horaChegada,
        consultorio: res.consultorio,
        status: res.status
      });
      return;
    }
  
    
    const medicoplantao = {
      horaChegada: req.body.horaChegada,
      horaSaida: req.body.horaSaida,
      consultorio: req.body.consultorio,
      unidadeId: req.body.unidadeId,
      medicoId: req.body.medicoId,
      status: req.body.status,
      dataPlantao: req.body.dataPlantao
    };
  
   
    MedicosPlantao.create(medicoplantao)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao cadastrar o plantão."
        });
      });
  };

  exports.editar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Os dados para edição não podem ficar em branco!"
        })
    }
  
    const id = req.params.id
  
    MedicosPlantao.update({
      horaChegada: req.body.horaChegada,
      horaSaida: req.body.horaSaida,
      consultorio: req.body.consultorio,
      status: req.body.status
    }, {where: {id: id}})    
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível encontrar e/ou alterar o plantão com o id=${id}. `
            })
        } else res.send({
                message: "Plantão alterado com sucesso!",
                id: res.id,
                horaChegada: res.horaChegada,
                horaSaida: res.horaSaida,
                consultorio: res.consultorio               
            })        
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao alterar o plantão com o id " + id
        })
    })    
  }