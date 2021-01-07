const { response, query } = require("express");
const { horarios, atendimentos } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const Atendimento = db.atendimentos;
const Agendamento = db.agendamentos;
const User = db.user;

exports.findAll = (req, res) => { 
    Atendimento.findAll()
    //Contrato.findAll({query})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar os atendimentos."
        });
      });
};


//Pega o atendimento por ID
exports.findOne = (req, res) => {
    const id = req.params.id
    // const numero = req.query.numero;
    // var condnumero = numero ? { numero: numero } : null
  
    return Atendimento.findByPk(id, { include: ["agendamentos", "user", "medicos_plantaos"] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar o atendimento: ", err);
      });   
  };

  exports.cadastrar = (req, res) => {
    
    if (!req.body.horaChegada) {
      res.status(400).send({
        message: "A hora que o paciente chegou deve ser preenchida!"
      });
      return;
    }
  
    
    const atendimento = {
      horaChegada: req.body.horaChegada,
      encaixe: req.body.encaixe,
      prontuario: req.body.prontuario,
      senha: req.body.senha,
      status: req.body.status,
      agendamentoId: req.body.agendamentoId,
      userId: req.body.userId
    };
  
   
    Atendimento.create(atendimento)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao cadastrar o atendimento."
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
  
    Atendimento.update({
      horaChegada: req.body.horaChegada,
      encaixe: req.body.encaixe,
      prontuario: req.body.prontuario,
      senha: req.body.senha,
      status: req.body.status,
      agendamentoId: req.body.agendamentoId,
      userId: req.body.userId
    }, {where: {id: id}})    
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Não foi possível encontrar e/ou alterar o atendimento com o id=${id}. `
            })
        } else res.send({
                message: "Atendimento alterado com sucesso!"                
            })        
    })
    .catch(err => {
        res.status(500).send({
            message: "Erro ao alterar o atendimento com o id " + id
        })
    })    
  }