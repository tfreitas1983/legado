// const { response, query } = require("express");

const db = require("../models");
const Medico = db.medicos;
const Horario = db.horarios;
const Unidade = db.unidades;
const Especialidade = db.especialidades;

exports.findAll = (req, res) => { 
    Medico.findAll({ include: [
        "unidades", "especialidades","medicos_plantaos","agendamentos", 
        { model: Horario, as: "horarios", 
        through: {  attributes: ['id','qnt', 'diaSemana', 'status', 'medicoId', 'horarioId'] }
        }         
      ] })
    //Contrato.findAll({query})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu algum erro ao carregar os médicos."
        });
      });
};


//Pega o médico por ID
exports.findOne = (req, res) => {
    const id = req.params.id
    
    
    // const numero = req.query.numero;
    // var condnumero = numero ? { numero: numero } : null
  
    return Medico.findByPk(id, { include: [
        "unidades", "especialidades", "medicos_plantaos", "agendamentos",       
        { model: Horario, as: "horarios", 
        through: {  attributes: ['id','qnt', 'diaSemana', 'status', 'medicoId', 'horarioId'] }
        }          
      ] })
      .then(data => {
       res.send(data)
      })
      .catch((err) => {
        console.log(">> Erro ao carregar o médico: ", err);
      });   
  };

  //Cadastra o médico
  exports.cadastrar = (req, res) => {
    // Validate request
    if (!req.body.nome) {
      res.status(400).send({
        message: "O nome do(a) médico(a) deve ser preenchido!"
      });
      return;
    }
  
    // Create 
    const medico = {
      nome: req.body.nome,
      status: req.body.status
    };
  
    // Save in the database
    Medico.create(medico)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao cadastrar o(a) médico(a)"
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

exports.addUnidade = (req, res) => {
  const {medicoId, unidadeId} = req.query 

  return Medico.findByPk(medicoId)
    .then((medico) => {
      if (!medico) {
        console.log("Médico não encontrado!");
        return null;
      }
      return Unidade.findByPk(unidadeId).then((unidade) => {
        if (!unidade) {
          console.log("Unidade não encontrada!");
          return null;
        }

        medico.addUnidade(unidade);
        console.log(`>> Adicionada a unidade id=${unidade.id} ao médico id=${medico.id}`);
        res.send(medico)
      });
    })
    .catch((err) => {
      console.log(">> Ocorreu um erro ao cadastrar o médico na unidade: ", err);
    });
};

exports.addEspecialidade = (req, res) => {
  const {medicoId, especialidadeId} = req.query 

  return Medico.findByPk(medicoId)
    .then((medico) => {
      if (!medico) {
        console.log("Médico não encontrado!");
        return null;
      }
      return Especialidade.findByPk(especialidadeId).then((especialidade) => {
        if (!especialidade) {
          console.log("Especialidade não encontrada!");
          return null;
        }

        medico.addEspecialidade(especialidade);
        console.log(`>> Adicionada a especialidade id=${especialidade.id} ao médico id=${medico.id}`);
        res.send(medico)
      });
    })
    .catch((err) => {
      console.log(">> Ocorreu um erro ao cadastrar o médico na especialidade: ", err);
    });
};

exports.addHorario = (req, res) => {
  const {medicoId, horarioId, diaSemana, qnt} = req.query 

  return Medico.findByPk(medicoId)
    .then((medico) => {
      if (!medico) {
        console.log("Médico não encontrado!");
        return null;
      }
      return Horario.findByPk(horarioId).then((horario) => {
        if (!horario) {
          console.log("Horário não encontradao!");
          return null;
        }

        medico.addHorario(horario, { through: { diaSemana: diaSemana, qnt: qnt } });
        console.log(`>> Adicionado o horário id=${horario.id} ao médico id=${medico.id}`);
        res.send(medico)
      });
    })
    .catch((err) => {
      console.log(">> Ocorreu um erro ao cadastrar o horário para o médico: ", err);
    });
};