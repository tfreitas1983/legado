const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Unidade = db.unidades

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    unidade: req.body.unidade
  })
    .then(user => {
      
      if (req.body.roles) {
        if (req.body.unidades) {
          Unidade.findAll({
            where: {
              descricao: {
                [Op.descricao]: req.body.unidade
              }
            }
          }).then(unidades => {
            user.setUnidades(unidades).then(() => {
              res.send({ message: "Usuário cadastrado com sucesso!" });
            });
          });
        } else {
          // user role = 1
          user.setUnidades([1]).then(() => {
            res.send({ message: "Usuário cadastrado com sucesso!" });
          });
        }
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuário cadastrado com sucesso!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Usuário cadastrado com sucesso!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha Inválida!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.buscarTodos = (req, res) => {   
  
  User.findAll({ include: [
    "unidades", "agendamentos","atendimentos"] })   
      .then(data => {
          res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Um erro ocorreu ao buscar o usuários"
          })
      })
}

exports.buscarUm = (req, res) => { 
  const id = req.params.id

  return User.findByPk(id, { include: [
    "unidades", "agendamentos", "atendimentos"] })  
      .then(data => {
        res.send(data)
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || `Um erro ocorreu ao buscar o usuário ${username}`
          })
      })
}

exports.editar = (req, res) => {   
  const username = {username: req.params.username}

  User.findOneAndUpdateind(username, req.body)   
  .then(data => {
    if (!data) {
        res.status(404).send({
            message: `Não foi possível encontrar e/ou alterar o usuário ${username}. `
        })
    } else res.send({
            message: "Usuário alterado com sucesso!"                
        })    
  })
  .catch(err => {
      res.status(500).send({
          message: "Erro ao alterar o usuário " + username
      })
  })
}