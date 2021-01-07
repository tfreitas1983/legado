const { response, query } = require("express");
const db = require("../models");
const Especialidade = db.especialidades;

exports.findAll = (req, res) => { 
    Especialidade.findAll({ include: [
        "unidades", "medicos","agendamentos"] })
    //Contrato.findAll({query})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar as especialidades."
        });
      });
};


//Pega o agendamento por ID
exports.findOne = (req, res) => {
    const id = req.params.id
    // const numero = req.query.numero;
    // var condnumero = numero ? { numero: numero } : null
  
    return Especialidade.findByPk(id, { include: [
        "unidades", "medicos","agendamentos"] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar a unidade: ", err);
      });   
  };