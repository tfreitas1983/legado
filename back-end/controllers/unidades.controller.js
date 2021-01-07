const { response, query } = require("express");
const { especialidades } = require("../models");
const db = require("../models");
const Unidade = db.unidades;

exports.findAll = (req, res) => { 
    Unidade.findAll({attributes: ["id", "descricao"]},
    { include: [
      "especialidades", "medicos","medicos_plantaos", "users","agendamentos"] }, )
    //Contrato.findAll({query})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar as unidades."
        });
      });
};


//Pega o agendamento por ID
exports.findOne = (req, res) => {
    const id = req.params.id
    // const numero = req.query.numero;
    // var condnumero = numero ? { numero: numero } : null
  
    return Unidade.findByPk(id, { include: [
        "especialidades", "medicos", "medicos_plantaos", "users", "agendamentos"] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar a unidade: ", err);
      });   
  };