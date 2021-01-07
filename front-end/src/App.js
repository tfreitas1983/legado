import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import logo from './images/logo.png'

/*
import AdicionarChamado from "./components/add-chamado.component"
import AdicionarChamadoTerceiros from './components/add-chamado-terceiros.component'
import ChamadosLista from "./components/list-chamado.component"
import EditarChamado from "./components/edit-chamado.component"
import ReabrirChamado from "./components/reabrir-chamado.component"
import Atender from "./components/solve-chamado.component"
import VisualizarChamado from "./components/view-chamado.component"
import VisualizarAtendente from "./components/view-atendente.component"
import VisualizarDiretor from "./components/view-diretor.component"
import AdicionarEquipamento from "./components/add-equipamento.component"

*/

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
//import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import Agendamento from "./components/agendamento.component";
import Atendimento from "./components/atendimento.component";
import Register from './components/register.component';
import ListarUsuario from './components/user-list.component'



class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN")
      });
    }
  }

  logOut() {
    AuthService.logout()
    this.props.history.push("/")
    window.location.reload()
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div style={{padding: 0, margin: 0}}>
        <nav className="navbar navbar-expand" style={{backgroundColor: '#2E8B57', padding: 0, margin: 0}}>
            <Link to={"/"} className="navbar-brand">
              <img src={logo} style={{height: 40+'px'}} alt="logo" />
            </Link>
            <div className="navbar-nav mr-auto">              

              {showModeratorBoard && (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  
                  <li className="nav-item">
                    <Link to={"/usuarios"} className="nav-link">
                      Usuários
                    </Link>
                  </li>
                  <li>
                    <Link to={"/atendimentos"} className="nav-link">
                    Atendimentos
                  </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/contratos"} className="nav-link">
                      Contratos
                    </Link>
                  </li>
                  
                </div>
              )}

              {showAdminBoard && (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Link to={"/atendimentos"} className="nav-link">
                    Atendimentos
                  </Link>                  
                </div>
              )}

              {currentUser && (
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  
                  <li>
                    <Link to={"/agendamentos"} className="nav-link">
                      Agendamentos
                    </Link>
                  </li>                                   
                </div>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                   
                  </Link>
                </li>
                <li className="nav-item">
                  <a href={"/"} className="nav-link" onClick={this.logOut}>
                    Sair
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>                
              </div>
            )}
          </nav>

          <div className="col-md-12">
            <Switch>
              <Route exact path={["/", "/home" ]} component={Home} />
              <Route exact path="/contratos" component={Profile} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/agendamentos" component={Agendamento} />
              <Route exact path="/atendimentos" component={Atendimento} />
              <Route exact path="/usuarios" component={ListarUsuario} />
              <Route exact path="/usuarios/cadastrar" component={Register} />
              
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;