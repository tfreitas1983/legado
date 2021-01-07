const { response, query } = require("express");
const db = require("../models");
const Agendamento = db.agendamentos;

exports.findAll = (req, res) => { 
    Agendamento.findAll({ include: [
      "unidades", "especialidades", "medicos", "horarios", "user"] })
    //Contrato.findAll({query})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar os agendamentos."
        });
      });
};


//Pega o agendamento por ID
exports.findOne = (req, res) => {
    const id = req.params.id
    // const numero = req.query.numero;
    // var condnumero = numero ? { numero: numero } : null
  
    return Agendamento.findByPk(id, { include: [
        "unidades", "especialidades", "medicos", "horarios", "user"] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar o agendamento: ", err);
      });   
  };

exports.cadastrar = (req, res) => {
    // Validate request
    if (!req.body.paciente) {
      res.status(400).send({
        message: "Paciente deve ser preenchido!"
      });
      return;
    }
  
    // Create a Tutorial
    const agendamento = {
      paciente: req.body.paciente,
      contrato: req.body.contrato,
      dataAgendamento: req.body.dataAgendamento,
      status: req.body.status,
      medicoId: req.body.medicoId,
      unidadeId: req.body.unidadeId,
      especialidadeId: req.body.especialidadeId,
      horarioId: req.body.horarioId,
      medicosPlantaoId: req.body.medicosPlantaoId,
      userId: req.body.userId
    };
  
    // Save Tutorial in the database
    Agendamento.create(agendamento)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao cadastrar o agendamento"
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

  Agendamento.update({
    paciente: req.body.paciente,
    contrato: req.body.contrato,
    dataAgendamento: req.body.dataAgendamento,
    status: req.body.status,
    medicoId: req.body.medicoId,
    unidadeId: req.body.unidadeId,
    especialidadeId: req.body.especialidadeId,
    horarioId: req.body.horarioId,
    medicosPlantaoId: req.body.medicosPlantaoId,
    userId: req.body.userId
  }, {where: {id: id}})    
  .then(data => {
      if (!data) {
          res.status(404).send({
              message: `Não foi possível encontrar e/ou alterar o agendamento com o id=${id}. `
          })
      } else res.send({
              message: "Agendamento alterado com sucesso!"                
          })        
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o agendamento com o id " + id
      })
  })    
}