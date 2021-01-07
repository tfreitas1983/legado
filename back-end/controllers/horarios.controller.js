const { response, query } = require("express");
const db = require("../models");
const Horario = db.horarios;
const Medico = db.medicos;

exports.findAll = (req, res) => { 
    Horario.findAll({ include: [
      { model: Medico, as: "medicos", 
      through: {  attributes: ['id','qnt', 'diaSemana', 'status', 'medicoId', 'horarioId'] }
      } ,"agendamentos"] })
    //Contrato.findAll({query})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar os horários."
        });
      });
};


//Pega o agendamento por ID
exports.findOne = (req, res) => {
    const id = req.params.id
    // const numero = req.query.numero;
    // var condnumero = numero ? { numero: numero } : null
  
    return Horario.findByPk(id, { include: [
         "medicos","agendamentos"] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar o horário: ", err);
      });   
  };