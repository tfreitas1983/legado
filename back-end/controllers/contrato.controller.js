const { response, query } = require("express");
const db = require("../models");
const Op = db.Sequelize.Op;
const Contrato = db.contratos;
const Pessoa = db.pessoas;
const Mensalidade = db.mensalidades;

exports.findAll = (req, res) => { 
    Contrato.findAll()
    //Contrato.findAll({query})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar os contratos."
        });
      });
};


//Pega o contrato por ID
exports.findOne = (req, res) => {
    const id = req.params.id
    // const numero = req.query.numero;
    // var condnumero = numero ? { numero: numero } : null
  
    return Contrato.findByPk(id, { include: ["pessoas", "mensalidades"] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar o contrato: ", err);
      });   
  };


//Pega as pessoas do contrato
/*exports.findContratoPessoaById = (contratoId) => {
    return Contrato.findByPk(contratoId, { include: ["pessoas"] })
      .then((contrato) => {
        return contrato;
      })
      .catch((err) => {
        console.log(">> Erro ao carregar o contrato: ", err);
      });
};

//Pega as mensalidades do contrato
exports.findContratoMensalidadeById = (contratoId) => {
    return Contrato.findByPk(contratoId, { include: ["mensalidades"] })
      .then((contrato) => {
        return contrato;
      })
      .catch((err) => {
        console.log(">> Erro ao carregar o contrato: ", err);
      });
};

//Pega a pessoa por ID
exports.findPessoaById = (id) => {
    return Pessoa.findByPk(id, { include: ["contrato"] })
      .then((pessoa) => {
        return pessoa;
      })
      .catch((err) => {
        console.log(">> Erro ao buscar o membro: ", err);
      });
};


//Pega a mensalidade por ID
exports.findMensalidadeById = (id) => {
    return Mensalidade.findByPk(id, { include: ["contrato"] })
      .then((mensalidade) => {
        return mensalidade;
      })
      .catch((err) => {
        console.log(">> Erro ao buscar a mensalidade do contrato: ", err);
      });
};

//Pega todos os contratos com as pessoas e mensalidades
/*
exports.findAll = () => {
    return Contrato.findAll({
      include: ["pessoas", "mensalidades"],
    }).then((contratos) => {
      return contratos;
    });
};

*/