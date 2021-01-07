const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:3099","http://10.1.1.26:3099","http://sysdoctor.ddns.net:3099"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;


/*db.sequelize.sync({force: true}).then(() => {
  console.log('Apaga e sincroniza da base de dados');
  initial();
});  */


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

const contrato = require("./controllers/contrato.controller");


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Sistema de Hora Marcada." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/contratos.routes')(app);
require('./routes/unidades.routes')(app);
require('./routes/especialidades.routes')(app);
require('./routes/medicos.routes')(app);
require('./routes/horarios.routes')(app);
require('./routes/agendamentos.routes')(app);
require('./routes/atendimentos.routes')(app);
require('./routes/medicosplantao.routes')(app);


// set port, listen for requests
const PORT = process.env.PORT || 5099;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});