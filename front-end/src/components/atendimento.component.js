import React, { Component } from 'react'
import AuthService from "../services/auth.service"
import AtendimentoDataService from "../services/atendimento.service"
import AgendamentoDataService from "../services/agendamento.service"
import UnidadeDataService from "../services/unidades.service"
import EspecialidadeDataService from "../services/especialidades.service"
import MedicoDataService from "../services/medicos.service"
import HorarioDataService from "../services/horarios.service"
import MedicosPlantaoDataService from '../services/medicoPlantao.service'
import {FaPlusCircle} from 'react-icons/fa'
import moment from 'moment'

export default class Atendimento extends Component {
    constructor(props) {
        super(props)
        
        this.pegaUnidades = this.pegaUnidades.bind(this)
        this.pegaUnidadeId = this.pegaUnidadeId.bind(this)
        this.pegaMedicos = this.pegaMedicos.bind(this)
        this.pegaEspecialidades = this.pegaEspecialidades.bind(this)
        this.pegaHorarios = this.pegaHorarios.bind(this)
        this.pegaAgendamentos = this.pegaAgendamentos.bind(this)
        this.pegaAtendimentos = this.pegaAtendimentos.bind(this)
        this.pegaMedicosPlantao = this.pegaMedicosPlantao.bind(this)
        this.handlerDataAgendamento = this.handlerDataAgendamento.bind(this)

        this.handlerUnidade = this.handlerUnidade.bind(this)
        this.handlerEspecialidade = this.handlerEspecialidade.bind(this)
        this.handlerMedico = this.handlerMedico.bind(this)
        this.pegaidMedico = this.pegaidMedico.bind(this)
        this.medicoPlantao = this.medicoPlantao.bind(this)
        this.handleSubmitMedico = this.handleSubmitMedico.bind(this)
        this.editarPlantao = this.editarPlantao.bind(this)

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            agendamentos: [],
            atendimentos: [],
            unidades: [],
            especialidades: [],
            medicos: [],
            horarios: [],
            horarios_medicos: [],
            medicosPlantaos: [],
            dados: [{paciente: "", contrato:"", idHora: ""}],
            dados2: [{paciente: "", contrato:"", idHora: ""}],
            dados3: [{paciente: "", contrato:"", idHora: ""}],
            dados4: [{paciente: "", contrato:"", idHora: ""}],
            dados5: [{paciente: "", contrato:"", idHora: ""}],
            dados6: [{paciente: "", contrato:"", idHora: ""}],
            dados7: [{paciente: "", contrato:"", idHora: ""}],
            dados8: [{paciente: "", contrato:"", idHora: ""}],
            dados9: [{paciente: "", contrato:"", idHora: ""}],
            dados10: [{paciente: "", contrato:"", idHora: ""}],
            dadosAtd: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd2: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd3: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd4: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd5: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd6: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd7: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd8: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd9: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            dadosAtd10: [{horaChegada: "", senha: "", encaixe: false, prontuario: false, agendamentoId: "", id: ""}],
            currentAgendamento: {id: "", paciente: "", contrato: "", horarioId: "", medicoId: "", especialidadeId: "", unidadeId: "", dataAgendamento: "", status: "", userId: ""},
            current: {id: "", agendamentoId: "", paciente: "", contrato: "", senha: "", prontuario: false, encaixe: "", medicosPlantaoId: "", horaChegada: ""},
            dataAgendamento: "",
            status: "",
            unidade:"NILÓPOLIS",
            especialidade: "",
            medico: "",
            idMedico: "",
            idEspecialidade: "",
            idUnidade: "",
            idHorario: "",
            diaSemana: "",
            medicosPlantaoId: "",
            horaEntrada: "",
            horaSaida: ""
        }
    }

    componentDidMount() {
        this.pegaUnidades()
        this.pegaEspecialidades()
        this.pegaMedicos()
        this.pegaHorarios()
        this.pegaMedicosPlantao() 
        this.pegaAgendamentos()          
        this.pegaAtendimentos()   
         
    }

    async pegaAgendamentos() {
        await AgendamentoDataService.buscarTodos()        
        .then(response => {
            const agendamentos = response.data.filter((agendamento) => {return agendamento.status === 1})
            this.setState({
                agendamentos: agendamentos
            })                
        })
        .catch(e => {
            console.log(e)
        })  
    }

    async pegaAtendimentos() {
        await AtendimentoDataService.buscarTodos()        
        .then(response => {
            const atendimentos = response.data.filter((atendimento) => {return atendimento.status === 1})
             this.setState({
                atendimentos: atendimentos
            })                
        })
        .catch(e => {
            console.log(e)
        })  
    }

     pegaUnidades() {
        UnidadeDataService.buscarTodos()        
        .then(response => {
            const unidades = response.data.map((unidade) => {return {id: unidade.id,descricao: unidade.descricao}})
              this.setState ({
                unidades: unidades
            })                
        })
        .catch(e => {
            console.log(e)
        })  
    }

    pegaEspecialidades() {
        EspecialidadeDataService.buscarTodos()        
        .then(response => {
            const especialidades = response.data
            this.setState({
                especialidades: especialidades
            })                
        })
        .catch(e => {
            console.log(e)
        })  
    }

    pegaMedicos() {
        MedicoDataService.buscarTodos()        
        .then(response => {
            const medicos = response.data
            this.setState({
                medicos: medicos
            })                
        })
        .catch(e => {
            console.log(e)
        })  
    }

    pegaHorarios() {
        HorarioDataService.buscarTodos()        
        .then(response => {
            const horarios = response.data
            const horarios_medicos = response.data.map((item) => { return item.medicos})
            this.setState({
                horarios: horarios,
                horarios_medicos: horarios_medicos
            })                
        })
        .catch(e => {
            console.log(e)
        })  
    }

    async pegaMedicosPlantao () {
        await MedicosPlantaoDataService.buscarTodos()        
        .then(response => {
            const medicosPlantaos = response.data.filter((plantao) => {return plantao.status === 1})
            this.setState({
                medicosPlantaos: medicosPlantaos
            })                
        })
        .catch(e => {
            console.log(e)
        })  
    }

    async handlerUnidade(e) {
        await this.setState({
          unidade: e.target.value
        })

        let filtroPlantao = []

        if (this.state.unidade !== "" && this.state.especialidade !== "" && this.state.medico !== "" && this.state.dataAgendamento !== "" ) {
            filtroPlantao = this.state.medicosPlantaos.filter((plantao) => {
                return (
                    plantao.dataPlantao === this.state.dataAgendamento &&
                    plantao.medicoId === this.state.idMedico &&
                    plantao.unidadeId === this.state.idUnidade
                )
            })
            if (filtroPlantao.length > 0) {
                this.setState({
                    medicosPlantaoId: filtroPlantao[0].id,
                    consultorio: filtroPlantao[0].consultorio,
                    horaEntrada: filtroPlantao[0].horaChegada,
                    horaSaida: filtroPlantao[0].horaSaida
                })
            }
        }

        this.pegaUnidadeId()
    } 

    async pegaUnidadeId () {
        if (this.state.unidades.length > 0 && this.state.unidade !== "" || this.state.unidade !== undefined) {
            const unidadeSelecionada = await this.state.unidades.filter((item) => { return this.state.unidade === item.descricao }) 
            
            await this.setState({
                idUnidade: +(unidadeSelecionada.map((item) => {return item.id}).join())
            })
        }
    }
    
    async handlerEspecialidade(e) {
        this.setState({
          especialidade: e.target.value,
          medico: ""
        })

        if (this.state.unidades.length > 0 &&this.state.unidade !== "" || this.state.unidade !== undefined) {
            const unidadeSelecionada = await this.state.unidades.filter((item) => { return this.state.unidade === item.descricao }) 
            
            this.setState({
                idUnidade: +(unidadeSelecionada.map((item) => {return item.id}).join())
            })
        }

        let filtroPlantao = []

        if (this.state.unidade !== "" && this.state.especialidade !== "" && this.state.medico !== "" && this.state.dataAgendamento !== "" ) {
            filtroPlantao = this.state.medicosPlantaos.filter((plantao) => {
                return (
                    plantao.dataPlantao === this.state.dataAgendamento &&
                    plantao.medicoId === this.state.idMedico &&
                    plantao.unidadeId === this.state.idUnidade
                )
            })

            if (filtroPlantao.length > 0) {
                this.setState({
                    medicosPlantaoId: filtroPlantao[0].id,
                    consultorio: filtroPlantao[0].consultorio,
                    horaEntrada: filtroPlantao[0].horaChegada,
                    horaSaida: filtroPlantao[0].horaSaida
                })
            }
        }
    } 

    async handlerMedico(e) {
        await this.setState({
          medico: e.target.value,
          idMedico: ""
        })

        if (this.state.medico !== "" || this.state.medico !== undefined) {
            const medicoSelecionado = await this.state.medicos.filter((item) => { return this.state.medico === item.nome }) 
            
            await this.setState({
                idMedico: parseInt(medicoSelecionado.map((item) => {return item.id}).join())
            })
        }

        if (this.state.medico !== "" || this.state.medico !== "1") {
            this.pegaidMedico()
        }
        let filtroPlantao = []

        if (this.state.unidade !== "" && this.state.especialidade !== "" && this.state.medico !== "" && this.state.dataAgendamento !== "" ) {
            filtroPlantao = this.state.medicosPlantaos.filter((plantao) => {
                return (
                    plantao.dataPlantao === this.state.dataAgendamento &&
                    plantao.medicoId === this.state.idMedico &&
                    plantao.unidadeId === this.state.idUnidade
                )
            })
            if (filtroPlantao.length > 0) {
                this.setState({
                    medicosPlantaoId: filtroPlantao[0].id,
                    consultorio: filtroPlantao[0].consultorio,
                    horaEntrada: filtroPlantao[0].horaChegada,
                    horaSaida: filtroPlantao[0].horaSaida
                })
            }
        }
    } 

   async handlerDataAgendamento(e) {
         this.setState({
          dataAgendamento:  e.target.value
        })

         if (e.target.value) {
            //console.log("data", moment(e.target.value).isoWeekday())
            if (moment(e.target.value).isoWeekday() === 1) {
                
                this.setState({
                    diaSemana: 2
                  })
            }
            if (moment(e.target.value).isoWeekday() === 2) {
                this.setState({
                    diaSemana: 3
                  })
            }
            if (moment(e.target.value).isoWeekday() === 3) {
                this.setState({
                    diaSemana: 4
                  })
            }
            if (moment(e.target.value).isoWeekday() === 4) {
                this.setState({
                    diaSemana: 5
                  })
            }
            if (moment(e.target.value).isoWeekday() === 5) {
                this.setState({
                    diaSemana: 6
                  })
            }
            if (moment(e.target.value).isoWeekday() === 6) {
                this.setState({
                    diaSemana: 7
                  })
            }
            if (moment(e.target.value).isoWeekday() === 7) {
                this.setState({
                    diaSemana: 1
                  })
            }            
        }

        await this.setState({
            medicosPlantaoId: "",
            consultorio: "",
            horaEntrada: "",
            horaSaida: ""
        })

        this.medicoPlantao()
    }  

    async medicoPlantao () {
        let filtroPlantao = []

        if (this.state.unidade !== "" && this.state.especialidade !== "" && this.state.medico !== "" && this.state.dataAgendamento !== "" ) {
            filtroPlantao = await this.state.medicosPlantaos.filter((plantao) => {
                return (
                    plantao.dataPlantao === this.state.dataAgendamento &&
                    plantao.medicoId === this.state.idMedico &&
                    plantao.unidadeId === this.state.idUnidade
                )
            })
            // verificar estado de data de agendamento para comparar com o array de plantões
            console.log("filtroplantao", filtroPlantao)
            if (filtroPlantao.length > 0) {
                this.setState({
                    medicosPlantaoId: filtroPlantao[0].id,
                    consultorio: filtroPlantao[0].consultorio,
                    horaEntrada: filtroPlantao[0].horaChegada,
                    horaSaida: filtroPlantao[0].horaSaida
                })
            }
        } 
    }

    async pegaidMedico() {
        if (this.state.medico !== "" || this.state.medico !== undefined) {
            const medicoSelecionado = await this.state.medicos.filter((item) => { return this.state.medico === item.nome }) 
            
            this.setState({
                idMedico: parseInt(medicoSelecionado.map((item) => {return item.id}).join())
            })
        }

        if (this.state.unidade !== "" || this.state.unidade !== undefined) {
            const unidadeSelecionada = await this.state.unidades.filter((item) => { return this.state.unidade === item.descricao }) 
            
            this.setState({
                idUnidade: parseInt(unidadeSelecionada.map((item) => {return item.id}).join())
            })
        }

        if (this.state.especialidade !== "" || this.state.especialidade !== undefined) {
            const especialidadeSelecionada = await this.state.especialidades.filter((item) => { return this.state.especialidade === item.especialidade }) 
            
            this.setState({
                idEspecialidade: parseInt(especialidadeSelecionada.map((item) => {return item.id}).join())
            })
        }
    }

    handlerConsultorio = (e) => {
        this.setState({
            consultorio: +e.target.value
        })
    }

    handleHoraEntrada = (e) => {
        this.setState({
            horaEntrada: e.target.value
        })
    }

    handleHoraSaida = (e) => {
        this.setState({
            horaSaida: e.target.value
        })
    }
    
    handleChange = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {
            let dados = [...this.state.dados]

            if (e.target.value) {
                dados[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
       
            this.setState({ dados }, () => console.log("dados1",this.state.dados))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange2 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {
            let dados2 = [...this.state.dados2]

            if (e.target.value) {
                dados2[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }

            this.setState({ dados2 }, () => console.log(this.state.dados2))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange3 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {
            let dados3 = [...this.state.dados3]

            if (e.target.value) {
                dados3[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
            this.setState({ dados3 }, () => console.log(this.state.dados3))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange4 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {

            let dados4 = [...this.state.dados4]
            if (e.target.value) {
                    dados4[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
            this.setState({ dados4 }, () => console.log(this.state.dados4))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange5 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {

            let dados5 = [...this.state.dados5]
            if (e.target.value) {
                    dados5[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
            this.setState({ dados5 }, () => console.log(this.state.dados5))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange6 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {

            let dados6 = [...this.state.dados6]
            if (e.target.value) {
                    dados6[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
            this.setState({ dados6 }, () => console.log(this.state.dados6))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange7 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {

            let dados7 = [...this.state.dados7]
            if (e.target.value) {
                    dados7[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
            this.setState({ dados7 }, () => console.log(this.state.dados7))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange8 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {

            let dados8 = [...this.state.dados8]
            if (e.target.value) {
                    dados8[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
            this.setState({ dados8 }, () => console.log(this.state.dados8))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange9 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {

            let dados9 = [...this.state.dados9]
            if (e.target.value) {
                    dados9[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
            this.setState({ dados9 }, () => console.log(this.state.dados9))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }

    handleChange10 = (e) => {
        if (["paciente", "contrato", "idHora"].includes(e.target.className) ) {

            let dados10 = [...this.state.dados10]
            if (e.target.value) {
                    dados10[e.target.dataset.id][e.target.className] = e.target.value.toUpperCase()
            }
            this.setState({ dados10 }, () => console.log(this.state.dados10))
        } else {
            if (e.target.value) {
                this.setState({ [e.target.paciente]: e.target.value.toUpperCase() })
            }
        }
    }
  
    addDados = (e) => {
        this.setState((prevState) => ({
        dados: [...prevState.dados, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados2 = (e) => {
        this.setState((prevState) => ({
        dados2: [...prevState.dados2, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados3 = (e) => {
        this.setState((prevState) => ({
        dados3: [...prevState.dados3, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados4 = (e) => {
        this.setState((prevState) => ({
        dados4: [...prevState.dados4, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados5 = (e) => {
        this.setState((prevState) => ({
        dados5: [...prevState.dados5, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados6 = (e) => {
        this.setState((prevState) => ({
        dados6: [...prevState.dados6, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados7 = (e) => {
        this.setState((prevState) => ({
        dados7: [...prevState.dados7, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados8 = (e) => {
        this.setState((prevState) => ({
        dados8: [...prevState.dados8, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados9 = (e) => {
        this.setState((prevState) => ({
        dados9: [...prevState.dados9, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    addDados10 = (e) => {
        this.setState((prevState) => ({
        dados10: [...prevState.dados10, {paciente:"", contrato:"", idHora:""}],
        }));
    }

    handleSubmit = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados[e.target.dataset.id].paciente,
            contrato: this.state.dados[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })
            
            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit2 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados2[e.target.dataset.id].paciente,
            contrato: this.state.dados2[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados2[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit3 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados3[e.target.dataset.id].paciente,
            contrato: this.state.dados3[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados3[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit4 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados4[e.target.dataset.id].paciente,
            contrato: this.state.dados4[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados4[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: moment(data.dataAgendamento).format('YYYY-MM-DD'),
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: [],
                idUnidade: data.unidadeId,
                idEspecialidade: data.especialidadeId,
                idMedico: data.medicoId
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit5 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados5[e.target.dataset.id].paciente,
            contrato: this.state.dados5[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados5[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit6 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados6[e.target.dataset.id].paciente,
            contrato: this.state.dados6[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados6[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit7 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados7[e.target.dataset.id].paciente,
            contrato: this.state.dados7[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados7[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit8 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados8[e.target.dataset.id].paciente,
            contrato: this.state.dados8[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados8[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit9 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados9[e.target.dataset.id].paciente,
            contrato: this.state.dados9[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados9[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleSubmit10 = (e) => { 
        e.preventDefault()         
       
        var data = {
            paciente: this.state.dados10[e.target.dataset.id].paciente,
            contrato: this.state.dados10[e.target.dataset.id].contrato,
            dataAgendamento: this.state.dataAgendamento,
            userId: this.state.currentUser.id,
            unidadeId: this.state.idUnidade,
            especialidadeId: this.state.idEspecialidade,
            medicoId: this.state.idMedico,
            horarioId: parseInt(this.state.dados10[e.target.dataset.id].idHora),
            status: 1
        }

        AgendamentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                paciente: response.data.paciente,
                contrato: response.data.contrato,
                dataAgendamento: response.data.dataAgendamento,
                userId: response.data.id,
                unidadeId: response.data.unidadeId,
                especialidadeId: response.data.especialidadeId,
                medicoId: response.data.medicoId,
                horarioId: response.data.horarioId,
                status: response.data.status,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            
            this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dados: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })            
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleChangeAtd = (e) => {

        const horaChegada = e.target.value 
       
        let id = e.target.dataset.id       

        AgendamentoDataService.buscarUm(id)
        .then(response => {
            this.setState( (prevState) => ({
                currentAgendamento: {
                ...prevState.current,
                    id: response.data.id,
                    agendamentoId: response.data.agendamentoId,
                    paciente: response.data.paciente ,
                    medicosPlantaoId: response.data.medicosPlantaoId,
                    horaChegada: horaChegada,
                    userId: response.data.userId,
                    status: response.data.status
                }
                }))
           
            console.log("horaChegada", this.state.current.horaChegada)
        })
        .catch(e => {
            console.log(e)
        })  
        /*if (["horaChegada", "senha", "encaixe", "prontuario", "agendamentoId"].includes(e.target.className) ) {
            

            let dadosAtd = [...this.state.dadosAtd]

            if (e.target.value) {                                 
               dadosAtd[e.target.dataset.id][e.target.className] = e.target.value                            
            }
       
           this.setState({ dadosAtd }, () => console.log("dadosAtd1",this.state.dadosAtd))

          
        } else {
            if (e.target.value) {
                this.setState({
                     [e.target.senha]: e.target.value.toUpperCase()
                })
            }
        } */
    }

    handleChangeHora = (e) => {
      
        const horaChegada = e.target.value 
       
        let id = e.target.dataset.id       

        AgendamentoDataService.buscarUm(id)
        .then(response => {
            this.setState( (prevState) => ({
                currentAgendamento: {
                ...prevState.currentAgendamento,
                    id: response.data.id,
                    paciente: response.data.paciente ,
                    contrato: response.data.contrato,
                    medicoId: response.data.medicoId,
                    horarioId: response.data.horarioId,
                    especialidadeId: response.data.especialidadeId,
                    unidadeId: response.data.unidadeId,
                    dataAgendamento: response.data.dataAgendamento,
                    userId: response.data.userId,
                    status: response.data.status,
                    horaChegada: horaChegada
                }
                }))
           
            console.log("horaChegada", this.state.current.horaChegada)
        })
        .catch(e => {
            console.log(e)
        }) 
        
        


}

    handleChangeSenha = (e) => {
      
        const senha = e.target.value
    
        let id = e.target.dataset.id

        AgendamentoDataService.buscarUm(id)
            .then(response => {
                this.setState( (prevState) => ({
                    currentAgendamento: {
                    ...prevState.currentAgendamento,
                        id: response.data.id,
                        paciente: response.data.paciente ,
                        contrato: response.data.contrato,
                        especialidadeId: response.data.especialidadeId,
                        unidadeId: response.data.unidadeId,
                        medicoId: response.data.medicoId,
                        horarioId: response.data.horarioId,
                        dataAgendamento: response.data.dataAgendamento,
                        userId: response.data.userId,
                        status: response.data.status,
                        senha: senha
                    }
                    }))
            })
            .catch(e => {
                console.log(e)
            }) 
    } 

    handleChangeEncaixe = (e) => {
      
        const encaixe = (e.target.className === 'encaixe' && e.target.type === 'checkbox')  ? e.target.checked : e.target.value
        
        let id = e.target.dataset.id
           
        if (this.state.current.prontuario === true) {
            AtendimentoDataService.buscarUm(id)
            .then(response => {
                this.setState( (prevState) => ({
                    current: {
                    ...prevState.current,
                        id: response.data.id,
                        encaixe: encaixe,
                        agendamentoId: response.data.agendamentoId,
                        senha: response.data.senha,
                        medicosPlantaoId: response.data.medicosPlantaoId,
                        horaChegada: response.data.horaChegada,
                        userId: response.data.userId,
                        status: response.data.status,
                        prontuario: true
                    }
                    }))
               
                console.log("encaixe", this.state.current.encaixe)
            })
            .catch(e => {
                console.log(e)
            })  
        } else {
            AtendimentoDataService.buscarUm(id)
            .then(response => {
                this.setState( (prevState) => ({
                    current: {
                    ...prevState.current,
                        id: response.data.id,
                        encaixe: encaixe,
                        agendamentoId: response.data.agendamentoId,
                        senha: response.data.senha,
                        medicosPlantaoId: response.data.medicosPlantaoId,
                        horaChegada: response.data.horaChegada,
                        userId: response.data.userId,
                        status: response.data.status,
                        prontuario: response.data.prontuario
                    }
                    }))
               
                console.log("encaixe", this.state.current.encaixe)
            })
            .catch(e => {
                console.log(e)
            })  
        }

    }

    handleChangeProntuario = (e) => {
        
        const prontuario = (e.target.className === 'prontuario' && e.target.type === 'checkbox') ? e.target.checked : e.target.value
        let id = e.target.dataset.id
        
        if (this.state.current.encaixe === true) {
            AtendimentoDataService.buscarUm(id)
            .then(response => {
                this.setState( (prevState) => ({
                    current: {
                    ...prevState.current,
                        id: response.data.id,
                        prontuario: prontuario,
                        agendamentoId: response.data.agendamentoId,
                        senha: response.data.senha,
                        encaixe: true,
                        medicosPlantaoId: response.data.medicosPlantaoId,
                        userId: response.data.userId,
                        status: response.data.status       
                    }
                }))
            
                console.log("prontuario", this.state.current.prontuario)
            })
            .catch(e => {
                console.log(e)
            })  
        }  else {
            AtendimentoDataService.buscarUm(id)
            .then(response => {
                this.setState( (prevState) => ({
                    current: {
                    ...prevState.current,
                        id: response.data.id,
                        agendamentoId: response.data.agendamentoId,
                        encaixe: response.data.encaixe,
                        senha: response.data.senha,
                        medicosPlantaoId: response.data.medicosPlantaoId,
                        horaChegada: response.data.horaChegada,
                        userId: response.data.userId,
                        status: response.data.status,
                        prontuario: prontuario    
                    }
                    }))
               
                console.log("encaixe", this.state.current.encaixe)
            })
            .catch(e => {
                console.log(e)
            })  
        }
    } 

    handleSubmitAtd = (e)  =>  { 
        e.preventDefault()     
    
  
        var data = {
            agendamentoId: this.state.currentAgendamento.id,
            horaChegada: this.state.currentAgendamento.horaChegada,
            senha: this.state.currentAgendamento.senha,
            encaixe: this.state.currentAgendamento.encaixe,
            prontuario: this.state.currentAgendamento.prontuario,
            medicosPlantaoId: parseInt(this.state.medicosPlantaoId),
            userId: this.state.currentUser.id,
            status: 1,
            dataAgendamento: this.state.currentAgendamento.dataAgendamento
        }

        console.log("data", data)

        AtendimentoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                id: response.data.id,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            

           this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dadosAtd: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })    
            
            this.pegaAtendimentos()
            this.forceUpdate()
        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleEdit = (e)  =>  { 
        e.preventDefault()     

       
        var data = {
            id: this.state.current.id,
            agendamentoId: this.state.current.agendamentoId,
            horaChegada: this.state.current.horaChegada,
            senha: this.state.current.senha,
            encaixe: this.state.current.encaixe,
            prontuario: this.state.current.prontuario,
            medicosPlantaoId: parseInt(this.state.medicosPlantaoId),
            userId: this.state.currentUser.id,
            status: 1,
            dataAgendamento: this.state.dataAgendamento
        }

        console.log("editar", data)

        AtendimentoDataService.editar(this.state.current.id, data)
        .then(response => {
            this.setState({
                id: response.data.id,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt
            })
            this.pegaAgendamentos()
            

           this.forceUpdate()
            this.setState({
                dataAgendamento: data.dataAgendamento,
                dadosAtd: [],
               // dadosEdt: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: [],
                current: ""
            })    
            
            this.pegaAtendimentos()
            this.forceUpdate()

        })
        .catch(e => {
            console.log(e)
        })              
    }

    handleRemove = (e) => {
        e.preventDefault()
        let id = e.target.dataset.id
        let agendamento = e.target.dataset.tag

        var data = {
            id: id,
            status: 0,
            dataAgendamento: this.state.dataAgendamento
        }

        AgendamentoDataService.editar(agendamento, data)          
        .then(response => {
            this.setState({
                agendamentoId: response.data.id,
                agendamentos: []
            }) 
            this.pegaAgendamentos()
        })
        .catch(e => {
            console.log(e)
        }) 
        

        AtendimentoDataService.editar(id, data)
        .then(response => {
            this.setState({
                id: response.data.id,
                atendimentos: []
            })    
            this.pegaAtendimentos()        
        })
        .catch(e => {
            console.log(e)
        })    

            
        
        
        //this.forceUpdate()
        this.setState({
            dataAgendamento: data.dataAgendamento,
            dadosAtd: [],
        //    dadosEdt: [],
            dados2: [],
            dados3: [],
            dados4: [],
            dados5: [],
            dados6: [],
            dados7: [],
            dados8: [],
            dados9: [],
            dados10: [],
            current: ""
        })    
        
//        this.pegaAtendimentos()        
  //      this.pegaAgendamentos()
        this.forceUpdate()
    }

    async handleSubmitMedico () {
        var data = {
            dataPlantao: this.state.dataAgendamento,
            horaChegada: this.state.horaEntrada,
            consultorio: +this.state.consultorio,
            medicoId: this.state.idMedico,
            unidadeId: this.state.idUnidade,
            horaSaida: "",
            status: 1
        }
       
      await MedicosPlantaoDataService.cadastrar(data)
        .then(response => {
            this.setState({
                medicosPlantaoId: response.data.id,
                horaEntrada: response.data.horaChegada,
                consultorio: response.data.consultorio,
                horaSaida: response.data.horaSaida
            })
            this.setState({
                dataAgendamento: data.dataPlantao,
                dadosAtd: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })    
            this.pegaAgendamentos()
            this.pegaAtendimentos()
            this.pegaMedicosPlantao()
            this.forceUpdate()
        })
        .catch(e => {
            console.log(e)
        }) 
    }

    async editarPlantao () {
        var data = {
            id: this.state.medicosPlantaoId,
            dataPlantao: this.state.dataAgendamento,
            horaChegada: this.state.horaEntrada,
            horaSaida: this.state.horaSaida,
            consultorio: this.state.consultorio,
            medicoId: this.state.idMedico,
            unidadeId: this.state.idUnidade
        }
       
      await MedicosPlantaoDataService.editar(this.state.medicosPlantaoId, data)
        .then(response => {
            this.setState({
                message: response.data.message
            })

            console.log("responsedata", response.data)
            this.setState({
                dataAgendamento: data.dataPlantao,
                dadosAtd: [],
                dados2: [],
                dados3: [],
                dados4: [],
                dados5: [],
                dados6: [],
                dados7: [],
                dados8: [],
                dados9: [],
                dados10: []
            })    
            this.pegaAgendamentos()
            this.pegaAtendimentos()
            this.pegaMedicosPlantao()
            this.forceUpdate()
        })
        .catch(e => {
            console.log(e)
        }) 
    }


    render () {

        const {especialidades, medicos, dados, dados2, dados3, dados4, dados5, dados6, dados7, dados8, dados9, dados10,
            dadosAtd, dadosAtd2, dadosAtd3, dadosAtd4, dadosAtd5, dadosAtd6, dadosAtd7, dadosAtd8, dadosAtd9, dadosAtd10,
            agendamentos, dataAgendamento, diaSemana, atendimentos} = this.state

            
            let horasNew = ""
            let filtroMedicoHorarioGeral = [],filtroMedicoHorarioMap = [], filtroMedicoHorario = []
            let agendamentosHorarios = [], atendimentosHorarios = []            
            let filtroHorario = []
            let ordem = [], ordem2 = [], ordem3 = [], ordem4 = [], ordem5 = [], ordem6 = [], ordem7 = [], ordem8 = [], ordem9 = [], ordem10 = []
            let ordemNew = [], ordemNew2 = [], ordemNew3 = [], ordemNew4 = [], ordemNew5 = [], ordemNew6 = [], ordemNew7 = [], ordemNew8 = [], ordemNew9 = [], ordemNew10 = []
            let montaAgendadia = [], montaAgendadia2= [], montaAgendadia3= [], montaAgendadia4 = [], montaAgendadia5 = [], montaAgendadia6 = [], montaAgendadia7 = [], montaAgendadia8 = [], montaAgendadia9 = [], montaAgendadia10 = []
            let agendadia = [], agendadia2 = [], agendadia3 = [], agendadia4 = [], agendadia5 = [], agendadia6 = [], agendadia7 = [], agendadia8 = [], agendadia9 = [], agendadia10 = []
            let montaHeader = [], montaHeader2 = [], montaHeader3 = [], montaHeader4 = [], montaHeader5 = [], montaHeader6 = [], montaHeader7 = [], montaHeader8 = [], montaHeader9 = [], montaHeader10 = []
            let mostraEditar = null, mostraSaida = null, mostraBotao = null

         
            let filtroUnidadeEspecialidade = especialidades.filter((esp => esp.unidades.some (
                unidades => unidades.descricao.includes(this.state.unidade))))

            let ordernado = filtroUnidadeEspecialidade.sort((a, b) => a.especialidade.localeCompare(b.especialidade))
      
            let listaEspecialidades = ""
            
            if (this.state.unidade !== "") {
                listaEspecialidades = ordernado.map((especialidade, index)=> (
                    <option value={especialidade.especialidade} key={index}> {especialidade.especialidade}</option>))    
            }
    
            let filtroUnidadeMedico = medicos.filter((medico => medico.unidades.some (
                unidades => unidades.descricao.includes(this.state.unidade))))

               
        
            let filtroEspecialidadeMedico = []
            if (filtroUnidadeMedico.length > 0 && this.state.especialidade !== "" ) {
    
                filtroEspecialidadeMedico = filtroUnidadeMedico.filter((medico => medico.especialidades.some (
                    especialidades => especialidades.especialidade === this.state.especialidade))).sort((a, b) => a.nome.localeCompare(b.nome))
            }
                
            
            let listaMedicos = null
            if (this.state.unidade !== "" && this.state.especialidade !== "") {
                listaMedicos = filtroEspecialidadeMedico.map((medico, index) => {
                    return ( <option value={medico.nome} key={index}> {medico.nome} </option> )})    
            }

    
    
            if (this.state.unidade !== "" && this.state.especialidade !== "" &&  this.state.medico !== "" && this.state.idMedico !== "") {
               filtroMedicoHorarioGeral = filtroEspecialidadeMedico.map((medico) => {
                   return medico.horarios
               })

             

                filtroMedicoHorarioMap = filtroMedicoHorarioGeral.map((medic, index) => {
                  return medic.filter((item) => {
                      return medic[index].medicos_horarios.medicoId === this.state.idMedico
                  })
                })

             
                let filtroMedicoHorario = filtroMedicoHorarioMap.filter((item) => {
                   return item.length > 0
                })
              
            
    
                if (filtroMedicoHorario[0]) {
                    horasNew = filtroMedicoHorario[0].map((item) => {
                        return {hora: item.hora, horas: item.medicos_horarios}
                    })
                }
    
                agendamentosHorarios = agendamentos.filter((agenda) => {
                    return (
                    this.state.dataAgendamento === agenda.dataAgendamento 
                        && this.state.unidade === agenda.unidades.descricao
                        && this.state.especialidade === agenda.especialidades.especialidade
                        && this.state.idMedico === agenda.medicoId
                        && agenda.status === 1
    
                    )
                }) 

                atendimentos.filter((atendimento) => {
                    agendamentosHorarios.filter((agendamento) => {                       
                       
                       if ( agendamento.id === atendimento.agendamentoId && atendimento.status === 1 ) {
                            atendimentosHorarios.push({
                                id: atendimento.id, 
                                agendamentoId: parseInt(atendimento.agendamentoId),
                                senha: atendimento.senha,
                                horaChegada: moment(atendimento.horaChegada,'HHmm').format('HH:mm'),
                                encaixe: atendimento.encaixe,
                                prontuario: atendimento.prontuario,
                                status: atendimento.status

                            })
                       }
                    })
                }) 

            

              // console.log("atendimentosHorarios", atendimentosHorarios)
                
             //   console.log("agendamentosHorarios", agendamentosHorarios)
               // console.log("horasNew", horasNew)
               //  console.log("horas", horasNew[0])
                
                let montaLista = []
                montaLista.push( <div className="row">
                    <div className="col-md-2" >
                        <div className="form-group" >
                            <label htmlFor="numero"> Ordem </label>
                            <label htmlFor="ordem"> <strong> {montaLista.indexOf()+1}</strong></label>
                        </div> 
                    </div>
                </div>)
                
                horasNew.map((hora, index) => {   
                    filtroHorario.push ( agendamentosHorarios.filter((item) => {
                        return item.horarioId === hora.horas.horarioId
                    }))
                })
    
               //  console.log("agendamentosHorarios", agendamentosHorarios)
                
                if (filtroHorario[0]) { 
                    agendadia = filtroHorario[0].map((paciente, indexp) => {                    
                        return {id: parseInt(paciente.id), contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                   
                    //console.log("agendadia", agendadia)
                }
    
                if (filtroHorario[1]) { 
                    agendadia2 = filtroHorario[1].map((paciente, indexp) => {                    
                        return {id: paciente.id,contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia2", agendadia2)
                }
    
                if (filtroHorario[2]) { 
                    agendadia3 = filtroHorario[2].map((paciente, indexp) => {                    
                        return {id: paciente.id,contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia3", agendadia3)
                }
    
                if (filtroHorario[3]) { 
                    agendadia4 = filtroHorario[3].map((paciente, indexp) => {                    
                        return {id: paciente.id,contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia4", agendadia4)
                }
    
                if (filtroHorario[4]) { 
                    agendadia5 = filtroHorario[4].map((paciente, indexp) => {                    
                        return {id: paciente.id,contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia4", agendadia4)
                }
    
                if (filtroHorario[5]) { 
                    agendadia6 = filtroHorario[5].map((paciente, indexp) => {                    
                        return {id: paciente.id,contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia4", agendadia4)
                }
    
                if (filtroHorario[6]) { 
                    agendadia7 = filtroHorario[6].map((paciente, indexp) => {                    
                        return {id: paciente.id,contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia4", agendadia4)
                }
    
                if (filtroHorario[7]) { 
                    agendadia8 = filtroHorario[7].map((paciente, indexp) => {                    
                        return {id: paciente.id,contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia4", agendadia4)
                }
    
                if (filtroHorario[8]) { 
                    agendadia9 = filtroHorario[8].map((paciente, indexp) => {                    
                        return {id: paciente.id, contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia4", agendadia4)
                }
    
                if (filtroHorario[9]) { 
                    agendadia10 = filtroHorario[9].map((paciente, indexp) => {                    
                        return {id: paciente.id, contrato: paciente.contrato, paciente: paciente.paciente, dataAgendamento: paciente.dataAgendamento, horarioId: paciente.horarioId, status: paciente.status}                    
                    })
                    // console.log("agendadia4", agendadia4)
                }
    

                /***************************************************
                 ******** INÍCIO DO PRIMEIRO BLOCO DE HORAS ********
                 ***************************************************/

                if (agendadia  && horasNew[0]) {
                    if (agendadia.length > 0) {
                        agendadia.map((paciente, index) => {
                            let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                            ordem.push(index) 

                            atendimentosHorarios.filter((atendimento) => {   
                                
                                  

                                if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[0].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[0].horas.diaSemana)) ) {

                                    if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                        mostraEditar = 
                                             <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                    } 

                                    montaAgendadia.push(<div className="row" key={index}>                         
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="id" name={id} data-id={index} id={id} /* onClick={() => this.setState(prevState => ({ ...dadosEdt.push( { ...prevState.dadosEdt[index], id: atendimento.id })})) }  */ style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                                <div className="col-md-1"> 
                                                    <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                                </div>
                                                <div className="col-md-">                                   
                                                    <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                                </div>                        
                                                <div className="col-md-3">
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <input 
                                                    className="encaixe" 
                                                    type="checkbox" 
                                                    checked={                                                        
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                       (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                    } 
                                                    name={encaixeId} 
                                                    data-id={atendimento.id} 
                                                    id={encaixeId} 
                                                    onChange={this.handleChangeEncaixe} />                                               
                                                </div> 

                                                <div className="col-md-1">                                                
                                                    <input 
                                                    className="prontuario" 
                                                    type="checkbox" 
                                                    checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                       (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                    name={prontuarioId} 
                                                    data-id={atendimento.id}
                                                    id={prontuarioId} 
                                                    onChange={this.handleChangeProntuario} />                                                
                                                </div> 
                                                <div className="col-md-2">                                                
                                                    {mostraEditar}                                                                                      
                                                    <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                                </div>                                           
                                            </div>
                                        </div>        
                                    </div>                   
                                ) }
                            })
                                
                            let semAtendimento =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                          
                           
                            if ( (paciente.horarioId === (horasNew[0].horas.horarioId))  && ( !semAtendimento.includes(paciente.id) ) && (diaSemana === (horasNew[0].horas.diaSemana)) ) {
                                
                                //console.log("map", dadosAtd )
                                
                                montaAgendadia.push(<div className="row" key={index} >  

                                  {/*  <input defaultValue={paciente.id} className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd.push( { ...prevState.dadosAtd[index], agendamentoId: paciente.id })})) } style={{border: 0, color: '#ffffff', width: 90+'%'}} />   */}
                                
                                    <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                        <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd.push( { ...prevState.dadosAtd[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-2">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                                </div>
                                            </div> 
                                        
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                                                                               
                                                    <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                            </div> 
                                            <div className="col-md-2">                                                
                                                <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                            </div> 
                                        </div>                                                   
                                    </div>
                                </div>                                    
                                )
                            }                             
                        })                        
                                   
                    }

                                        
                   
                    if (ordem.length > 0) {
                        ordemNew.push (parseInt(ordem.slice(-1))+1)
                    } else {
                        ordemNew.push (0)
                    }
    
                    const hora =  parseInt(horasNew[0].horas.horarioId)
                    //console.log("hora", horasNew[0])
    
                    if (dataAgendamento !== "" && horasNew[0].horas.diaSemana !== diaSemana ) {
                        montaHeader = <div style={{display: 'flex', justifyContent: 'center'}}>
                            <h2>Profissional sem agenda no dia</h2>
                        </div>
                    }
                    
    
                    if (horasNew[0].horas.diaSemana === diaSemana) {
                        montaHeader = <div>
                            <div className="horalista" key={horasNew.indexOf()}>                    
                                <ul>                    
                                    <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[0].hora} - {horasNew[0].horas.qnt} vagas </strong> </li>                        
                                    <div>
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="col-md-1">
                                                <label htmlFor="ordem">Ordem</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="contrato">Contrato</label>
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="paciente">Paciente</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="horaChegada">Hora</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="senha">Senha</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="encaixe">Encaixe</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="prontuario">Prontuário</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="ações">Ações</label>
                                            </div>
                                        </div>
                                    </div>
    
                                    {montaAgendadia} 
                                    
                                    <hr />  
                                    <FaPlusCircle onClick={this.addDados} />
                                
    
                                    { 
                                        dados.map((val, idx)=> {    
                                            //console.log("idx", idx)
    
                                            if (dados[idx].length > 0) {
                                                dados.push([{...dados[idx], idHora: hora}])
                                            }    
    
                                            ordemNew.push(parseInt(ordemNew.slice(-1)) + parseInt(idx)+1)
                                            let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                            return (
                                            <div key={idx} className="row" onMouseOver={this.handleChange} >
                                                <div onMouseOver={this.handleChange}> 
                                                    <input defaultValue={hora} className="idHora"
                                                    name={horaId} data-id={idx} id={horaId}
                                                    style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                        
                                                    <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                        <label>{parseInt(ordemNew.pop())}</label>
                                                        <div className="col-md-2">                                                                                        
                                                            <input
                                                            type="text"
                                                            name={ageId}
                                                            data-id={idx}
                                                            id={ageId}
                                                            value={dados[idx].contrato} 
                                                            className="contrato"
                                                            onChange={this.handleChange}
                                                            />                                                    
                                                        </div>
                                                        
                                                        <div className="col-md-6">                                               
                                                                <input
                                                                type="text"
                                                                name={catId}
                                                                data-id={idx}
                                                                id={catId}
                                                                value={dados[idx].paciente} 
                                                                className="paciente"
                                                                onChange={this.handleChange}                                                      
                                                                />                                                  
                                                        </div>
                                                        
                                                        <div className="col-md-2">                                                
                                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmit} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                            })  
                                        }                 
                                </ul>                       
                            </div>
                        </div> 
                    }                
                }
                /*****************************************
                 INÍCIO DO SEGUNDO BLOCO DE HORÁRIO
                ****************************************** */
    
                if (agendadia2  && horasNew[1]) {
                    if (agendadia2.length > 0) {
                        agendadia2.map((paciente, index) => {
                            let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                            ordem2.push(index) 

                            atendimentosHorarios.filter((atendimento) => { 

                                if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[1].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[1].horas.diaSemana)) ) {

                                    if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                        mostraEditar = 
                                             <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                    } 

                                    montaAgendadia2.push(<div className="row" key={index}>                         
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                                <div className="col-md-1"> 
                                                    <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                                </div>
                                                <div className="col-md-">                                   
                                                    <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                                </div>                        
                                                <div className="col-md-3">
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <input 
                                                    className="encaixe" 
                                                    type="checkbox" 
                                                    checked={                                                        
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                       (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                    } 
                                                    name={encaixeId} 
                                                    data-id={atendimento.id} 
                                                    id={encaixeId} 
                                                    onChange={this.handleChangeEncaixe} />                                               
                                                </div> 

                                                <div className="col-md-1">                                                
                                                    <input 
                                                    className="prontuario" 
                                                    type="checkbox" 
                                                    checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                       (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                    name={prontuarioId} 
                                                    data-id={atendimento.id}
                                                    id={prontuarioId} 
                                                    onChange={this.handleChangeProntuario} />                                                
                                                </div> 
                                                <div className="col-md-2">                                                
                                                    {mostraEditar}                                                                                      
                                                    <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                                </div>                                           
                                            </div>
                                        </div>        
                                    </div>                   
                                ) }
                            })
                                
                            let semAtendimento2 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                          
                           
                            if ( (paciente.horarioId === (horasNew[1].horas.horarioId))  && ( !semAtendimento2.includes(paciente.id) ) && (diaSemana === (horasNew[1].horas.diaSemana)) ) {
                                
                                //console.log("map", dadosAtd )
                                
                                montaAgendadia2.push(<div className="row" key={index} >  
                                
                                    <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                        <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd2.push( { ...prevState.dadosAtd2[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-2">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                                </div>
                                            </div> 
                                        
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                                                                               
                                                    <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                            </div> 
                                            <div className="col-md-2">                                                
                                                <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                            </div> 
                                        </div>                                                   
                                    </div>
                                </div>                                    
                                )
                            }                             
                        })                        
                                   
                    }

                                        
                   
                    if (ordem2.length > 0) {
                        ordemNew2.push (parseInt(ordem2.slice(-1))+1)
                    } else {
                        ordemNew2.push (0)
                    }
    
                    const hora =  parseInt(horasNew[1].horas.horarioId)
                    //console.log("hora", horasNew[0])
    
                                       
    
                    if (horasNew[1].horas.diaSemana === diaSemana) {
                        montaHeader2 = <div>
                            <div className="horalista" key={horasNew.indexOf()}>                    
                                <ul>                    
                                    <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[1].hora} - {horasNew[1].horas.qnt} vagas </strong> </li>                        
                                    <div>
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="col-md-1">
                                                <label htmlFor="ordem">Ordem</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="contrato">Contrato</label>
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="paciente">Paciente</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="horaChegada">Hora</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="senha">Senha</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="encaixe">Encaixe</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="prontuario">Prontuário</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="ações">Ações</label>
                                            </div>
                                        </div>
                                    </div>
    
                                    {montaAgendadia2} 
                                    
                                    <hr />  
                                    <FaPlusCircle onClick={this.addDados2} />
                                
    
                                    { 
                                        dados2.map((val, idx)=> {    
                                            //console.log("idx", idx)
    
                                            if (dados2[idx].length > 0) {
                                                dados2.push([{...dados2[idx], idHora: hora}])
                                            }    
    
                                            ordemNew2.push(parseInt(ordemNew2.slice(-1)) + parseInt(idx)+1)
                                            let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                            return (
                                            <div key={idx} className="row" onMouseOver={this.handleChange2} >
                                                <div onMouseOver={this.handleChange2}> 
                                                    <input defaultValue={hora} className="idHora"
                                                    name={horaId} data-id={idx} id={horaId}
                                                    style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                        
                                                    <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                        <label>{parseInt(ordemNew2.pop())}</label>
                                                        <div className="col-md-2">                                                                                        
                                                            <input
                                                            type="text"
                                                            name={ageId}
                                                            data-id={idx}
                                                            id={ageId}
                                                            value={dados2[idx].contrato} 
                                                            className="contrato"
                                                            onChange={this.handleChange2}
                                                            />                                                    
                                                        </div>
                                                        
                                                        <div className="col-md-6">                                               
                                                                <input
                                                                type="text"
                                                                name={catId}
                                                                data-id={idx}
                                                                id={catId}
                                                                value={dados2[idx].paciente} 
                                                                className="paciente"
                                                                onChange={this.handleChange2}                                                      
                                                                />                                                  
                                                        </div>
                                                        
                                                        <div className="col-md-2">                                                
                                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmit2} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                            })  
                                        }                 
                                </ul>                       
                            </div>
                        </div> 
                    }                
                }


                /*****************************************
                     INÍCIO DO TERCEIRO BLOCO DE HORÁRIO
                ****************************************** */
    
               if (agendadia3  && horasNew[2]) {
                if (agendadia3.length > 0) {
                    agendadia3.map((paciente, index) => {
                        let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                        ordem3.push(index) 

                        atendimentosHorarios.filter((atendimento) => { 

                            if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[2].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[2].horas.diaSemana)) ) {

                                if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                    mostraEditar = 
                                         <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                } 

                                montaAgendadia3.push(<div className="row" key={index}>                         
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input 
                                                className="encaixe" 
                                                type="checkbox" 
                                                checked={                                                        
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                   (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                } 
                                                name={encaixeId} 
                                                data-id={atendimento.id} 
                                                id={encaixeId} 
                                                onChange={this.handleChangeEncaixe} />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input 
                                                className="prontuario" 
                                                type="checkbox" 
                                                checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                   (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                name={prontuarioId} 
                                                data-id={atendimento.id}
                                                id={prontuarioId} 
                                                onChange={this.handleChangeProntuario} />                                                
                                            </div> 
                                            <div className="col-md-2">                                                
                                                {mostraEditar}                                                                                      
                                                <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                            </div>                                           
                                        </div>
                                    </div>        
                                </div>                   
                            ) }
                        })
                            
                        let semAtendimento3 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                      
                       
                        if ( (paciente.horarioId === (horasNew[2].horas.horarioId))  && ( !semAtendimento3.includes(paciente.id) ) && (diaSemana === (horasNew[2].horas.diaSemana)) ) {
                            
                            montaAgendadia3.push(<div className="row" key={index} >  
                            
                                <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                    <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd3.push( { ...prevState.dadosAtd3[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                        <div className="col-md-1"> 
                                            <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                        </div>
                                        <div className="col-md-2">                                   
                                            <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                        </div>                        
                                        <div className="col-md-3">
                                            <div className="form-group">                                       
                                                <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                            </div>
                                        </div> 
                                    
                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                                                                               
                                                <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                       
                                                <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                        </div> 

                                        <div className="col-md-1">                                                
                                            <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                        </div> 
                                        <div className="col-md-2">                                                
                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                        </div> 
                                    </div>                                                   
                                </div>
                            </div>                                    
                            )
                        }                             
                    })                        
                               
                }

                                    
               
                if (ordem3.length > 0) {
                    ordemNew3.push (parseInt(ordem3.slice(-1))+1)
                } else {
                    ordemNew3.push (0)
                }

                const hora =  parseInt(horasNew[2].horas.horarioId)
                
                
                if (horasNew[2].horas.diaSemana === diaSemana) {
                    montaHeader3 = <div>
                        <div className="horalista" key={horasNew.indexOf()}>                    
                            <ul>                    
                                <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[2].hora} - {horasNew[2].horas.qnt} vagas </strong> </li>                        
                                <div>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="col-md-1">
                                            <label htmlFor="ordem">Ordem</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="contrato">Contrato</label>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="paciente">Paciente</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="horaChegada">Hora</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="senha">Senha</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="encaixe">Encaixe</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="prontuario">Prontuário</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="ações">Ações</label>
                                        </div>
                                    </div>
                                </div>

                                {montaAgendadia3} 
                                
                                <hr />  
                                <FaPlusCircle onClick={this.addDados3} />
                            

                                { 
                                    dados3.map((val, idx)=> {    
                                        
                                        if (dados3[idx].length > 0) {
                                            dados3.push([{...dados3[idx], idHora: hora}])
                                        }    

                                        ordemNew3.push(parseInt(ordemNew3.slice(-1)) + parseInt(idx)+1)
                                        let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                        return (
                                        <div key={idx} className="row" onMouseOver={this.handleChange3} >
                                            <div onMouseOver={this.handleChange3}> 
                                                <input defaultValue={hora} className="idHora"
                                                name={horaId} data-id={idx} id={horaId}
                                                style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                    
                                                <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                    <label>{parseInt(ordemNew3.pop())}</label>
                                                    <div className="col-md-2">                                                                                        
                                                        <input
                                                        type="text"
                                                        name={ageId}
                                                        data-id={idx}
                                                        id={ageId}
                                                        value={dados3[idx].contrato} 
                                                        className="contrato"
                                                        onChange={this.handleChange3}
                                                        />                                                    
                                                    </div>
                                                    
                                                    <div className="col-md-6">                                               
                                                            <input
                                                            type="text"
                                                            name={catId}
                                                            data-id={idx}
                                                            id={catId}
                                                            value={dados3[idx].paciente} 
                                                            className="paciente"
                                                            onChange={this.handleChange3}                                                      
                                                            />                                                  
                                                    </div>
                                                    
                                                    <div className="col-md-2">                                                
                                                        <button type="submit"  className="btn btn-success" onClick={this.handleSubmit3} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                        })  
                                    }                 
                            </ul>                       
                        </div>
                    </div> 
                }                
            }

                /***************************************************
                 ******** INÍCIO DO QUARTO BLOCO DE HORAS ********
                 ***************************************************/

                if (agendadia4  && horasNew[3]) {
                    if (agendadia4.length > 0) {
                        agendadia4.map((paciente, index) => {
                            let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                            ordem4.push(index) 

                            atendimentosHorarios.filter((atendimento) => { 

                                if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[3].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[3].horas.diaSemana)) ) {

                                    if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                        mostraEditar = 
                                             <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                    } 

                                    montaAgendadia4.push(<div className="row" key={index}>                         
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                                <div className="col-md-1"> 
                                                    <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                                </div>
                                                <div className="col-md-">                                   
                                                    <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                                </div>                        
                                                <div className="col-md-3">
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <input 
                                                    className="encaixe" 
                                                    type="checkbox" 
                                                    checked={                                                        
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                       (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                    } 
                                                    name={encaixeId} 
                                                    data-id={atendimento.id} 
                                                    id={encaixeId} 
                                                    onChange={this.handleChangeEncaixe} />                                               
                                                </div> 

                                                <div className="col-md-1">                                                
                                                    <input 
                                                    className="prontuario" 
                                                    type="checkbox" 
                                                    checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                       (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                    name={prontuarioId} 
                                                    data-id={atendimento.id}
                                                    id={prontuarioId} 
                                                    onChange={this.handleChangeProntuario} />                                                
                                                </div> 
                                                <div className="col-md-2">                                                
                                                    {mostraEditar}                                                                                      
                                                    <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                                </div>                                           
                                            </div>
                                        </div>        
                                    </div>                   
                                ) }
                            })
                                
                            let semAtendimento4 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                          
                           
                            if ( (paciente.horarioId === (horasNew[3].horas.horarioId))  && ( !semAtendimento4.includes(paciente.id) ) && (diaSemana === (horasNew[3].horas.diaSemana)) ) {
                               
                                
                                montaAgendadia4.push(<div className="row" key={index} >  
                                
                                    <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                        <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd4.push( { ...prevState.dadosAtd4[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-2">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                                </div>
                                            </div> 
                                        
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                                                                               
                                                    <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                            </div> 
                                            <div className="col-md-2">                                                
                                                <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                            </div> 
                                        </div>                                                   
                                    </div>
                                </div>                                    
                                )
                            }                             
                        })                        
                                   
                    }

                                        
                   
                    if (ordem4.length > 0) {
                        ordemNew4.push (parseInt(ordem4.slice(-1))+1)
                    } else {
                        ordemNew4.push (0)
                    }
    
                    const hora =  parseInt(horasNew[3].horas.horarioId)                                       
    
                    if (horasNew[3].horas.diaSemana === diaSemana) {
                        montaHeader4 = <div>
                            <div className="horalista" key={horasNew.indexOf()}>                    
                                <ul>                    
                                    <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[3].hora} - {horasNew[3].horas.qnt} vagas </strong> </li>                        
                                    <div>
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="col-md-1">
                                                <label htmlFor="ordem">Ordem</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="contrato">Contrato</label>
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="paciente">Paciente</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="horaChegada">Hora</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="senha">Senha</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="encaixe">Encaixe</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="prontuario">Prontuário</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="ações">Ações</label>
                                            </div>
                                        </div>
                                    </div>
    
                                    {montaAgendadia4} 
                                    
                                    <hr />  
                                    <FaPlusCircle onClick={this.addDados4} />
                                
    
                                    { 
                                        dados4.map((val, idx)=> {    
    
                                            if (dados4[idx].length > 0) {
                                                dados4.push([{...dados4[idx], idHora: hora}])
                                            }    
    
                                            ordemNew4.push(parseInt(ordemNew4.slice(-1)) + parseInt(idx)+1)
                                            let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                            return (
                                            <div key={idx} className="row" onMouseOver={this.handleChange4} >
                                                <div onMouseOver={this.handleChange4}> 
                                                    <input defaultValue={hora} className="idHora"
                                                    name={horaId} data-id={idx} id={horaId}
                                                    style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                        
                                                    <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                        <label>{parseInt(ordemNew4.pop())}</label>
                                                        <div className="col-md-2">                                                                                        
                                                            <input
                                                            type="text"
                                                            name={ageId}
                                                            data-id={idx}
                                                            id={ageId}
                                                            value={dados4[idx].contrato} 
                                                            className="contrato"
                                                            onChange={this.handleChange4}
                                                            />                                                    
                                                        </div>
                                                        
                                                        <div className="col-md-6">                                               
                                                                <input
                                                                type="text"
                                                                name={catId}
                                                                data-id={idx}
                                                                id={catId}
                                                                value={dados4[idx].paciente} 
                                                                className="paciente"
                                                                onChange={this.handleChange4}                                                      
                                                                />                                                  
                                                        </div>
                                                        
                                                        <div className="col-md-2">                                                
                                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmit4} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                            })  
                                        }                 
                                </ul>                       
                            </div>
                        </div> 
                    }                
                }



                /***************************************************
                 ******* INÍCIO DO QUINTO BLOCO *******************
                 **************************************************/
    
                if (agendadia5  && horasNew[4]) {
                    if (agendadia5.length > 0) {
                        agendadia5.map((paciente, index) => {
                            let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                            ordem5.push(index) 

                            atendimentosHorarios.filter((atendimento) => { 

                                if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[4].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[4].horas.diaSemana)) ) {

                                    if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                        mostraEditar = 
                                             <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                    } 

                                    montaAgendadia5.push(<div className="row" key={index}>                         
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                                <div className="col-md-1"> 
                                                    <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                                </div>
                                                <div className="col-md-">                                   
                                                    <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                                </div>                        
                                                <div className="col-md-3">
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <input 
                                                    className="encaixe" 
                                                    type="checkbox" 
                                                    checked={                                                        
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                       (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                    } 
                                                    name={encaixeId} 
                                                    data-id={atendimento.id} 
                                                    id={encaixeId} 
                                                    onChange={this.handleChangeEncaixe} />                                               
                                                </div> 

                                                <div className="col-md-1">                                                
                                                    <input 
                                                    className="prontuario" 
                                                    type="checkbox" 
                                                    checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                       (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                    name={prontuarioId} 
                                                    data-id={atendimento.id}
                                                    id={prontuarioId} 
                                                    onChange={this.handleChangeProntuario} />                                                
                                                </div> 
                                                <div className="col-md-2">                                                
                                                    {mostraEditar}                                                                                      
                                                    <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                                </div>                                           
                                            </div>
                                        </div>        
                                    </div>                   
                                ) }
                            })
                                
                            let semAtendimento5 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                          
                           
                            if ( (paciente.horarioId === (horasNew[4].horas.horarioId))  && ( !semAtendimento5.includes(paciente.id) ) && (diaSemana === (horasNew[4].horas.diaSemana)) ) {
                                                                
                                montaAgendadia5.push(<div className="row" key={index} >  
                                
                                    <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                        <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd5.push( { ...prevState.dadosAtd5[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-2">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                                </div>
                                            </div> 
                                        
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                                                                               
                                                    <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                            </div> 
                                            <div className="col-md-2">                                                
                                                <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                            </div> 
                                        </div>                                                   
                                    </div>
                                </div>                                    
                                )
                            }                             
                        })                        
                                   
                    }

                                        
                   
                    if (ordem5.length > 0) {
                        ordemNew5.push (parseInt(ordem5.slice(-1))+1)
                    } else {
                        ordemNew5.push (0)
                    }
    
                    const hora =  parseInt(horasNew[4].horas.horarioId)
                                   
    
                    if (horasNew[4].horas.diaSemana === diaSemana) {
                        montaHeader5 = <div>
                            <div className="horalista" key={horasNew.indexOf()}>                    
                                <ul>                    
                                    <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[4].hora} - {horasNew[4].horas.qnt} vagas </strong> </li>                        
                                    <div>
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="col-md-1">
                                                <label htmlFor="ordem">Ordem</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="contrato">Contrato</label>
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="paciente">Paciente</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="horaChegada">Hora</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="senha">Senha</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="encaixe">Encaixe</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="prontuario">Prontuário</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="ações">Ações</label>
                                            </div>
                                        </div>
                                    </div>
    
                                    {montaAgendadia5} 
                                    
                                    <hr />  
                                    <FaPlusCircle onClick={this.addDados5} />
                                
    
                                    { 
                                        dados5.map((val, idx)=> {    
                                              
                                            if (dados5[idx].length > 0) {
                                                dados5.push([{...dados5[idx], idHora: hora}])
                                            }    
    
                                            ordemNew5.push(parseInt(ordemNew5.slice(-1)) + parseInt(idx)+1)
                                            let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                            return (
                                            <div key={idx} className="row" onMouseOver={this.handleChange5} >
                                                <div onMouseOver={this.handleChange5}> 
                                                    <input defaultValue={hora} className="idHora"
                                                    name={horaId} data-id={idx} id={horaId}
                                                    style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                        
                                                    <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                        <label>{parseInt(ordemNew5.pop())}</label>
                                                        <div className="col-md-2">                                                                                        
                                                            <input
                                                            type="text"
                                                            name={ageId}
                                                            data-id={idx}
                                                            id={ageId}
                                                            value={dados5[idx].contrato} 
                                                            className="contrato"
                                                            onChange={this.handleChange5}
                                                            />                                                    
                                                        </div>
                                                        
                                                        <div className="col-md-6">                                               
                                                                <input
                                                                type="text"
                                                                name={catId}
                                                                data-id={idx}
                                                                id={catId}
                                                                value={dados5[idx].paciente} 
                                                                className="paciente"
                                                                onChange={this.handleChange5}                                                      
                                                                />                                                  
                                                        </div>
                                                        
                                                        <div className="col-md-2">                                                
                                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmit5} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                            })  
                                        }                 
                                </ul>                       
                            </div>
                        </div> 
                    }                
                }

                /*********************************************
                 ******* INÍCIO DO BLOCO SEIS ****************
                 *********************************************/
    
                if (agendadia6  && horasNew[5]) {
                    if (agendadia6.length > 0) {
                        agendadia6.map((paciente, index) => {
                            let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                            ordem6.push(index) 

                            atendimentosHorarios.filter((atendimento) => { 

                                if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[5].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[5].horas.diaSemana)) ) {

                                    if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                        mostraEditar = 
                                             <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                    } 

                                    montaAgendadia6.push(<div className="row" key={index}>                         
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                                <div className="col-md-1"> 
                                                    <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                                </div>
                                                <div className="col-md-">                                   
                                                    <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                                </div>                        
                                                <div className="col-md-3">
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <div className="form-group">                                       
                                                        <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                    </div>
                                                </div> 

                                                <div className="col-md-1">                                               
                                                    <input 
                                                    className="encaixe" 
                                                    type="checkbox" 
                                                    checked={                                                        
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                       (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                    } 
                                                    name={encaixeId} 
                                                    data-id={atendimento.id} 
                                                    id={encaixeId} 
                                                    onChange={this.handleChangeEncaixe} />                                               
                                                </div> 

                                                <div className="col-md-1">                                                
                                                    <input 
                                                    className="prontuario" 
                                                    type="checkbox" 
                                                    checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                       (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                       (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                       ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                    name={prontuarioId} 
                                                    data-id={atendimento.id}
                                                    id={prontuarioId} 
                                                    onChange={this.handleChangeProntuario} />                                                
                                                </div> 
                                                <div className="col-md-2">                                                
                                                    {mostraEditar}                                                                                      
                                                    <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                                </div>                                           
                                            </div>
                                        </div>        
                                    </div>                   
                                ) }
                            })
                                
                            let semAtendimento6 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                          
                           
                            if ( (paciente.horarioId === (horasNew[5].horas.horarioId))  && ( !semAtendimento6.includes(paciente.id) ) && (diaSemana === (horasNew[5].horas.diaSemana)) ) {
                                
                                montaAgendadia6.push(<div className="row" key={index} >  
                                
                                    <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                        <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd6.push( { ...prevState.dadosAtd6[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-2">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                                </div>
                                            </div> 
                                        
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                                                                               
                                                    <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                            </div> 
                                            <div className="col-md-2">                                                
                                                <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                            </div> 
                                        </div>                                                   
                                    </div>
                                </div>                                    
                                )
                            }                             
                        })                        
                                   
                    }

                                        
                   
                    if (ordem6.length > 0) {
                        ordemNew6.push (parseInt(ordem6.slice(-1))+1)
                    } else {
                        ordemNew6.push (0)
                    }
    
                    const hora =  parseInt(horasNew[5].horas.horarioId)
                                       
    
                    if (horasNew[5].horas.diaSemana === diaSemana) {
                        montaHeader6 = <div>
                            <div className="horalista" key={horasNew.indexOf()}>                    
                                <ul>                    
                                    <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[5].hora} - {horasNew[5].horas.qnt} vagas </strong> </li>                        
                                    <div>
                                        <hr />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <div className="col-md-1">
                                                <label htmlFor="ordem">Ordem</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="contrato">Contrato</label>
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="paciente">Paciente</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="horaChegada">Hora</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="senha">Senha</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="encaixe">Encaixe</label>
                                            </div>
                                            <div className="col-md-1">
                                                <label htmlFor="prontuario">Prontuário</label>
                                            </div>
                                            <div className="col-md-2">
                                                <label htmlFor="ações">Ações</label>
                                            </div>
                                        </div>
                                    </div>
    
                                    {montaAgendadia6} 
                                    
                                    <hr />  
                                    <FaPlusCircle onClick={this.addDados6} />
                                
    
                                    { 
                                        dados6.map((val, idx)=> {    
                                           
                                            if (dados6[idx].length > 0) {
                                                dados6.push([{...dados6[idx], idHora: hora}])
                                            }    
    
                                            ordemNew6.push(parseInt(ordemNew6.slice(-1)) + parseInt(idx)+1)
                                            let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                            return (
                                            <div key={idx} className="row" onMouseOver={this.handleChange6} >
                                                <div onMouseOver={this.handleChange6}> 
                                                    <input defaultValue={hora} className="idHora"
                                                    name={horaId} data-id={idx} id={horaId}
                                                    style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                        
                                                    <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                        <label>{parseInt(ordemNew6.pop())}</label>
                                                        <div className="col-md-2">                                                                                        
                                                            <input
                                                            type="text"
                                                            name={ageId}
                                                            data-id={idx}
                                                            id={ageId}
                                                            value={dados6[idx].contrato} 
                                                            className="contrato"
                                                            onChange={this.handleChange6}
                                                            />                                                    
                                                        </div>
                                                        
                                                        <div className="col-md-6">                                               
                                                                <input
                                                                type="text"
                                                                name={catId}
                                                                data-id={idx}
                                                                id={catId}
                                                                value={dados6[idx].paciente} 
                                                                className="paciente"
                                                                onChange={this.handleChange6}                                                      
                                                                />                                                  
                                                        </div>
                                                        
                                                        <div className="col-md-2">                                                
                                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmit6} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                            })  
                                        }                 
                                </ul>                       
                            </div>
                        </div> 
                    }                
                }

                /******************************************
                 ********** INCIO DO BLOCO SETE
                ******************************************/
    
               if (agendadia7  && horasNew[6]) {
                if (agendadia7.length > 0) {
                    agendadia7.map((paciente, index) => {
                        let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                        ordem7.push(index) 

                        atendimentosHorarios.filter((atendimento) => { 

                            if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[6].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[6].horas.diaSemana)) ) {

                                if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                    mostraEditar = 
                                         <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                } 

                                montaAgendadia7.push(<div className="row" key={index}>                         
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input 
                                                className="encaixe" 
                                                type="checkbox" 
                                                checked={                                                        
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                   (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                } 
                                                name={encaixeId} 
                                                data-id={atendimento.id} 
                                                id={encaixeId} 
                                                onChange={this.handleChangeEncaixe} />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input 
                                                className="prontuario" 
                                                type="checkbox" 
                                                checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                   (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                name={prontuarioId} 
                                                data-id={atendimento.id}
                                                id={prontuarioId} 
                                                onChange={this.handleChangeProntuario} />                                                
                                            </div> 
                                            <div className="col-md-2">                                                
                                                {mostraEditar}                                                                                      
                                                <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                            </div>                                           
                                        </div>
                                    </div>        
                                </div>                   
                            ) }
                        })
                            
                        let semAtendimento7 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                      
                       
                        if ( (paciente.horarioId === (horasNew[6].horas.horarioId))  && ( !semAtendimento7.includes(paciente.id) ) && (diaSemana === (horasNew[6].horas.diaSemana)) ) {
                                                    
                            montaAgendadia7.push(<div className="row" key={index} >  
                            
                                <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                    <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd7.push( { ...prevState.dadosAtd7[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                        <div className="col-md-1"> 
                                            <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                        </div>
                                        <div className="col-md-2">                                   
                                            <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                        </div>                        
                                        <div className="col-md-3">
                                            <div className="form-group">                                       
                                                <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                            </div>
                                        </div> 
                                    
                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                                                                               
                                                <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                       
                                                <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                        </div> 

                                        <div className="col-md-1">                                                
                                            <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                        </div> 
                                        <div className="col-md-2">                                                
                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                        </div> 
                                    </div>                                                   
                                </div>
                            </div>                                    
                            )
                        }                             
                    })                        
                               
                }

                                    
               
                if (ordem7.length > 0) {
                    ordemNew7.push (parseInt(ordem7.slice(-1))+1)
                } else {
                    ordemNew7.push (0)
                }

                const hora =  parseInt(horasNew[6].horas.horarioId)
                

                if (horasNew[6].horas.diaSemana === diaSemana) {
                    montaHeader7 = <div>
                        <div className="horalista" key={horasNew.indexOf()}>                    
                            <ul>                    
                                <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[6].hora} - {horasNew[6].horas.qnt} vagas </strong> </li>                        
                                <div>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="col-md-1">
                                            <label htmlFor="ordem">Ordem</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="contrato">Contrato</label>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="paciente">Paciente</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="horaChegada">Hora</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="senha">Senha</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="encaixe">Encaixe</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="prontuario">Prontuário</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="ações">Ações</label>
                                        </div>
                                    </div>
                                </div>

                                {montaAgendadia7} 
                                
                                <hr />  
                                <FaPlusCircle onClick={this.addDados7} />
                            

                                { 
                                    dados7.map((val, idx)=> {    
                                      
                                        if (dados7[idx].length > 0) {
                                            dados7.push([{...dados7[idx], idHora: hora}])
                                        }    

                                        ordemNew7.push(parseInt(ordemNew7.slice(-1)) + parseInt(idx)+1)
                                        let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                        return (
                                        <div key={idx} className="row" onMouseOver={this.handleChange7} >
                                            <div onMouseOver={this.handleChange7}> 
                                                <input defaultValue={hora} className="idHora"
                                                name={horaId} data-id={idx} id={horaId}
                                                style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                    
                                                <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                    <label>{parseInt(ordemNew7.pop())}</label>
                                                    <div className="col-md-2">                                                                                        
                                                        <input
                                                        type="text"
                                                        name={ageId}
                                                        data-id={idx}
                                                        id={ageId}
                                                        value={dados7[idx].contrato} 
                                                        className="contrato"
                                                        onChange={this.handleChange7}
                                                        />                                                    
                                                    </div>
                                                    
                                                    <div className="col-md-6">                                               
                                                            <input
                                                            type="text"
                                                            name={catId}
                                                            data-id={idx}
                                                            id={catId}
                                                            value={dados7[idx].paciente} 
                                                            className="paciente"
                                                            onChange={this.handleChange7}                                                      
                                                            />                                                  
                                                    </div>
                                                    
                                                    <div className="col-md-2">                                                
                                                        <button type="submit"  className="btn btn-success" onClick={this.handleSubmit7} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                        })  
                                    }                 
                            </ul>                       
                        </div>
                    </div> 
                }                
            } 

            /*******************************************
             *********** INICIO DO BLOCO 8 *************
             ******************************************/
    
            if (agendadia8  && horasNew[7]) {
                if (agendadia8.length > 0) {
                    agendadia8.map((paciente, index) => {
                        let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                        ordem8.push(index) 

                        atendimentosHorarios.filter((atendimento) => { 

                            if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[7].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[7].horas.diaSemana)) ) {

                                if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                    mostraEditar = 
                                         <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                } 

                                montaAgendadia8.push(<div className="row" key={index}>                         
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input 
                                                className="encaixe" 
                                                type="checkbox" 
                                                checked={                                                        
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                   (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                } 
                                                name={encaixeId} 
                                                data-id={atendimento.id} 
                                                id={encaixeId} 
                                                onChange={this.handleChangeEncaixe} />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input 
                                                className="prontuario" 
                                                type="checkbox" 
                                                checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                   (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                name={prontuarioId} 
                                                data-id={atendimento.id}
                                                id={prontuarioId} 
                                                onChange={this.handleChangeProntuario} />                                                
                                            </div> 
                                            <div className="col-md-2">                                                
                                                {mostraEditar}                                                                                      
                                                <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                            </div>                                           
                                        </div>
                                    </div>        
                                </div>                   
                            ) }
                        })
                            
                        let semAtendimento8 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                      
                       
                        if ( (paciente.horarioId === (horasNew[7].horas.horarioId))  && ( !semAtendimento8.includes(paciente.id) ) && (diaSemana === (horasNew[7].horas.diaSemana)) ) {
                           
                            
                            montaAgendadia8.push(<div className="row" key={index} >  
                            
                                <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                    <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd8.push( { ...prevState.dadosAtd8[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                        <div className="col-md-1"> 
                                            <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                        </div>
                                        <div className="col-md-2">                                   
                                            <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                        </div>                        
                                        <div className="col-md-3">
                                            <div className="form-group">                                       
                                                <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                            </div>
                                        </div> 
                                    
                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                                                                               
                                                <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                       
                                                <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                        </div> 

                                        <div className="col-md-1">                                                
                                            <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                        </div> 
                                        <div className="col-md-2">                                                
                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                        </div> 
                                    </div>                                                   
                                </div>
                            </div>                                    
                            )
                        }                             
                    })                        
                               
                }

                                    
               
                if (ordem8.length > 0) {
                    ordemNew8.push (parseInt(ordem8.slice(-1))+1)
                } else {
                    ordemNew8.push (0)
                }

                const hora =  parseInt(horasNew[7].horas.horarioId)
              
                if (horasNew[7].horas.diaSemana === diaSemana) {
                    montaHeader8 = <div>
                        <div className="horalista" key={horasNew.indexOf()}>                    
                            <ul>                    
                                <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[7].hora} - {horasNew[7].horas.qnt} vagas </strong> </li>                        
                                <div>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="col-md-1">
                                            <label htmlFor="ordem">Ordem</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="contrato">Contrato</label>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="paciente">Paciente</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="horaChegada">Hora</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="senha">Senha</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="encaixe">Encaixe</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="prontuario">Prontuário</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="ações">Ações</label>
                                        </div>
                                    </div>
                                </div>

                                {montaAgendadia8} 
                                
                                <hr />  
                                <FaPlusCircle onClick={this.addDados8} />
                            

                                { 
                                    dados8.map((val, idx)=> {    
                                       

                                        if (dados8[idx].length > 0) {
                                            dados8.push([{...dados8[idx], idHora: hora}])
                                        }    

                                        ordemNew8.push(parseInt(ordemNew8.slice(-1)) + parseInt(idx)+1)
                                        let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                        return (
                                        <div key={idx} className="row" onMouseOver={this.handleChange8} >
                                            <div onMouseOver={this.handleChange8}> 
                                                <input defaultValue={hora} className="idHora"
                                                name={horaId} data-id={idx} id={horaId}
                                                style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                    
                                                <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                    <label>{parseInt(ordemNew8.pop())}</label>
                                                    <div className="col-md-2">                                                                                        
                                                        <input
                                                        type="text"
                                                        name={ageId}
                                                        data-id={idx}
                                                        id={ageId}
                                                        value={dados8[idx].contrato} 
                                                        className="contrato"
                                                        onChange={this.handleChange8}
                                                        />                                                    
                                                    </div>
                                                    
                                                    <div className="col-md-6">                                               
                                                            <input
                                                            type="text"
                                                            name={catId}
                                                            data-id={idx}
                                                            id={catId}
                                                            value={dados8[idx].paciente} 
                                                            className="paciente"
                                                            onChange={this.handleChange8}                                                      
                                                            />                                                  
                                                    </div>
                                                    
                                                    <div className="col-md-2">                                                
                                                        <button type="submit"  className="btn btn-success" onClick={this.handleSubmit8} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                        })  
                                    }                 
                            </ul>                       
                        </div>
                    </div> 
                }                
            }

            /*************************************
             ****** INICIO DO BLOCO NOVE
             ************************************/
    
            if (agendadia9  && horasNew[8]) {
                if (agendadia9.length > 0) {
                    agendadia9.map((paciente, index) => {
                        let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                        ordem9.push(index) 

                        atendimentosHorarios.filter((atendimento) => { 

                            if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[8].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[8].horas.diaSemana)) ) {

                                if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                    mostraEditar = 
                                         <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                } 

                                montaAgendadia9.push(<div className="row" key={index}>                         
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input 
                                                className="encaixe" 
                                                type="checkbox" 
                                                checked={                                                        
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                   (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                } 
                                                name={encaixeId} 
                                                data-id={atendimento.id} 
                                                id={encaixeId} 
                                                onChange={this.handleChangeEncaixe} />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input 
                                                className="prontuario" 
                                                type="checkbox" 
                                                checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                   (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                name={prontuarioId} 
                                                data-id={atendimento.id}
                                                id={prontuarioId} 
                                                onChange={this.handleChangeProntuario} />                                                
                                            </div> 
                                            <div className="col-md-2">                                                
                                                {mostraEditar}                                                                                      
                                                <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                            </div>                                           
                                        </div>
                                    </div>        
                                </div>                   
                            ) }
                        })
                            
                        let semAtendimento9 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                      
                       
                        if ( (paciente.horarioId === (horasNew[8].horas.horarioId))  && ( !semAtendimento9.includes(paciente.id) ) && (diaSemana === (horasNew[8].horas.diaSemana)) ) {
                                                      
                            montaAgendadia9.push(<div className="row" key={index} >  
                            
                                <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                    <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd9.push( { ...prevState.dadosAtd9[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                        <div className="col-md-1"> 
                                            <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                        </div>
                                        <div className="col-md-2">                                   
                                            <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                        </div>                        
                                        <div className="col-md-3">
                                            <div className="form-group">                                       
                                                <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                            </div>
                                        </div> 
                                    
                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                                                                               
                                                <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                       
                                                <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                        </div> 

                                        <div className="col-md-1">                                                
                                            <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                        </div> 
                                        <div className="col-md-2">                                                
                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                        </div> 
                                    </div>                                                   
                                </div>
                            </div>                                    
                            )
                        }                             
                    })                        
                               
                }

                                    
               
                if (ordem9.length > 0) {
                    ordemNew9.push (parseInt(ordem9.slice(-1))+1)
                } else {
                    ordemNew9.push (0)
                }

                const hora =  parseInt(horasNew[8].horas.horarioId)
                          

                if (horasNew[8].horas.diaSemana === diaSemana) {
                    montaHeader9 = <div>
                        <div className="horalista" key={horasNew.indexOf()}>                    
                            <ul>                    
                                <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[8].hora} - {horasNew[8].horas.qnt} vagas </strong> </li>                        
                                <div>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="col-md-1">
                                            <label htmlFor="ordem">Ordem</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="contrato">Contrato</label>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="paciente">Paciente</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="horaChegada">Hora</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="senha">Senha</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="encaixe">Encaixe</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="prontuario">Prontuário</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="ações">Ações</label>
                                        </div>
                                    </div>
                                </div>

                                {montaAgendadia9} 
                                
                                <hr />  
                                <FaPlusCircle onClick={this.addDados9} />
                            

                                { 
                                    dados9.map((val, idx)=> {    
                                      
                                        if (dados9[idx].length > 0) {
                                            dados9.push([{...dados9[idx], idHora: hora}])
                                        }    

                                        ordemNew9.push(parseInt(ordemNew9.slice(-1)) + parseInt(idx)+1)
                                        let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                        return (
                                        <div key={idx} className="row" onMouseOver={this.handleChange9} >
                                            <div onMouseOver={this.handleChange9}> 
                                                <input defaultValue={hora} className="idHora"
                                                name={horaId} data-id={idx} id={horaId}
                                                style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                    
                                                <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                    <label>{parseInt(ordemNew9.pop())}</label>
                                                    <div className="col-md-2">                                                                                        
                                                        <input
                                                        type="text"
                                                        name={ageId}
                                                        data-id={idx}
                                                        id={ageId}
                                                        value={dados9[idx].contrato} 
                                                        className="contrato"
                                                        onChange={this.handleChange9}
                                                        />                                                    
                                                    </div>
                                                    
                                                    <div className="col-md-6">                                               
                                                            <input
                                                            type="text"
                                                            name={catId}
                                                            data-id={idx}
                                                            id={catId}
                                                            value={dados9[idx].paciente} 
                                                            className="paciente"
                                                            onChange={this.handleChange9}                                                      
                                                            />                                                  
                                                    </div>
                                                    
                                                    <div className="col-md-2">                                                
                                                        <button type="submit"  className="btn btn-success" onClick={this.handleSubmit9} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                        })  
                                    }                 
                            </ul>                       
                        </div>
                    </div> 
                }                
            }

            /**************************************
             ************ INICIO BLOCO 10 *********
             *************************************/
    
            if (agendadia10  && horasNew[9]) {
                if (agendadia10.length > 0) {
                    agendadia10.map((paciente, index) => {
                        let id = `id-${index}`,  horaId = `hora-${index}`, senhaId = `senha-${index}`, encaixeId = `encaixe-${index}`, prontuarioId = `prontuario-${index}`, agendamentoID = `agendamentoId-${index}`
                        ordem10.push(index) 

                        atendimentosHorarios.filter((atendimento) => { 

                            if (atendimento.status === 1 && paciente.status === 1 && (paciente.horarioId === (horasNew[9].horas.horarioId)) && (paciente.id === atendimento.agendamentoId ) && (diaSemana === (horasNew[9].horas.diaSemana)) ) {

                                if (this.state.current.id !== "" && atendimento.id === this.state.current.id && (this.state.current.encaixe !== atendimento.encaixe || this.state.current.prontuario !== atendimento.prontuario)) {
                                    mostraEditar = 
                                         <button type="submit"  className="btn btn-success" onClick={this.handleEdit} data-id={index} > Editar </button>                                           
                                } 

                                montaAgendadia10.push(<div className="row" key={index}>                         
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="id" name={id} data-id={index} id={id} style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                            <div className="col-md-1"> 
                                                <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                            </div>
                                            <div className="col-md-">                                   
                                                <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                            </div>                        
                                            <div className="col-md-3">
                                                <div className="form-group">                                       
                                                    <input disabled type="text" className="form-control" defaultValue={paciente.paciente}  />                                        
                                                </div>
                                            </div>
                                            
                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input disabled type="text" name={horaId} data-id={index} id={horaId} className="horaChegada" defaultValue={atendimento.horaChegada} />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <div className="form-group">                                       
                                                    <input type="text" disabled defaultValue={atendimento.senha} name={senhaId} data-id={index} id={senhaId} className="senha" />                                        
                                                </div>
                                            </div> 

                                            <div className="col-md-1">                                               
                                                <input 
                                                className="encaixe" 
                                                type="checkbox" 
                                                checked={                                                        
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true && atendimento.encaixe === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.encaixe === true) ||
                                                   (this.state.current.id === "" && atendimento.encaixe === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.encaixe === true)                                                        
                                                } 
                                                name={encaixeId} 
                                                data-id={atendimento.id} 
                                                id={encaixeId} 
                                                onChange={this.handleChangeEncaixe} />                                               
                                            </div> 

                                            <div className="col-md-1">                                                
                                                <input 
                                                className="prontuario" 
                                                type="checkbox" 
                                                checked={ ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true && atendimento.prontuario === true) ||
                                                   (this.state.current.id !== "" && this.state.current.id !== atendimento.id && atendimento.prontuario === true) ||
                                                   (this.state.current.id === "" && atendimento.prontuario === true ) ||
                                                   ((this.state.current.id !== "" && this.state.current.id === atendimento.id) && this.state.current.prontuario === true)} 
                                                name={prontuarioId} 
                                                data-id={atendimento.id}
                                                id={prontuarioId} 
                                                onChange={this.handleChangeProntuario} />                                                
                                            </div> 
                                            <div className="col-md-2">                                                
                                                {mostraEditar}                                                                                      
                                                <button type="submit" data-id={atendimento.id} data-tag={atendimento.agendamentoId} className="btn btn-danger" onClick={this.handleRemove} > Inativar </button>                                              
                                            </div>                                           
                                        </div>
                                    </div>        
                                </div>                   
                            ) }
                        })
                            
                        let semAtendimento10 =  atendimentosHorarios.map((item) => {return item.agendamentoId} )
                      
                       
                        if ( (paciente.horarioId === (horasNew[9].horas.horarioId))  && ( !semAtendimento10.includes(paciente.id) ) && (diaSemana === (horasNew[9].horas.diaSemana)) ) {                          
                            
                            montaAgendadia10.push(<div className="row" key={index} >  
                            
                                <div className="col-md-12"  style={{display: 'flex', justifyContent: 'space-between'}} >
                                    <div className="agendamentoId" name={agendamentoID} data-id={index} id={agendamentoID}  onClick={() => this.setState(prevState => ({ ...dadosAtd10.push( { ...prevState.dadosAtd10[index], agendamentoId: paciente.id })})) } style={{display: 'flex', justifyContent: 'space-between', width: 'inherit'}} >
                                        <div className="col-md-1"> 
                                            <label id={`ordem${parseInt(index)+1}`} >{parseInt(index)+1}</label>
                                        </div>
                                        <div className="col-md-2">                                   
                                            <input className="form-control" defaultValue={paciente.contrato} />                                                                       
                                        </div>                        
                                        <div className="col-md-3">
                                            <div className="form-group">                                       
                                                <input type="text" className="form-control" defaultValue={paciente.paciente} />                                        
                                            </div>
                                        </div> 
                                    
                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                                                                               
                                                <input type="time" name={horaId} data-id={paciente.id} id={horaId} className="horaChegada" onChange={this.handleChangeHora} />                                        
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <div className="form-group">                                       
                                                <input type="text"  name={senhaId} data-id={paciente.id} id={senhaId} className="senha" onChange={this.handleChangeSenha} />                                         
                                            </div>
                                        </div> 

                                        <div className="col-md-1">                                               
                                            <input hidden className="encaixe" type="checkbox" name={encaixeId} data-id={index} id={encaixeId} onChange={this.handleChangeAtd}  />                                               
                                        </div> 

                                        <div className="col-md-1">                                                
                                            <input hidden className="prontuario" type="checkbox" name={prontuarioId} data-id={index} id={prontuarioId} onChange={this.handleChangeAtd} />                                               
                                        </div> 
                                        <div className="col-md-2">                                                
                                            <button type="submit"  className="btn btn-success" onClick={this.handleSubmitAtd} data-id={index} > Salvar </button>                                              
                                        </div> 
                                    </div>                                                   
                                </div>
                            </div>                                    
                            )
                        }                             
                    })                        
                               
                }

                                    
               
                if (ordem10.length > 0) {
                    ordemNew10.push (parseInt(ordem10.slice(-1))+1)
                } else {
                    ordemNew10.push (0)
                }

                const hora =  parseInt(horasNew[9].horas.horarioId)

                if (horasNew[9].horas.diaSemana === diaSemana) {
                    montaHeader10 = <div>
                        <div className="horalista" key={horasNew.indexOf()}>                    
                            <ul>                    
                                <li key={horasNew.indexOf()} className="lista"> <strong> Horário:  {horasNew[9].hora} - {horasNew[9].horas.qnt} vagas </strong> </li>                        
                                <div>
                                    <hr />
                                </div>
                                <div className="row">
                                    <div className="col-md-12" style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div className="col-md-1">
                                            <label htmlFor="ordem">Ordem</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="contrato">Contrato</label>
                                        </div>
                                        <div className="col-md-3">
                                            <label htmlFor="paciente">Paciente</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="horaChegada">Hora</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="senha">Senha</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="encaixe">Encaixe</label>
                                        </div>
                                        <div className="col-md-1">
                                            <label htmlFor="prontuario">Prontuário</label>
                                        </div>
                                        <div className="col-md-2">
                                            <label htmlFor="ações">Ações</label>
                                        </div>
                                    </div>
                                </div>

                                {montaAgendadia10} 
                                
                                <hr />  
                                <FaPlusCircle onClick={this.addDados10} />
                            

                                { 
                                    dados10.map((val, idx)=> { 

                                        if (dados10[idx].length > 0) {
                                            dados10.push([{...dados10[idx], idHora: hora}])
                                        }    

                                        ordemNew10.push(parseInt(ordemNew10.slice(-1)) + parseInt(idx)+1)
                                        let catId = `cat-${idx}`, ageId = `age-${idx}`, horaId = `hora-${idx}`
                                        return (
                                        <div key={idx} className="row" onMouseOver={this.handleChange10} >
                                            <div onMouseOver={this.handleChange10}> 
                                                <input defaultValue={hora} className="idHora"
                                                name={horaId} data-id={idx} id={horaId}
                                                style={{border: 0, color: '#ffffff', width: 90+'%'}} />  
                                                    
                                                <div style={{display: 'flex', justifyContent: 'space-around', marginLeft: 5+'%', width: 90+'vw'}} >
                                                    <label>{parseInt(ordemNew10.pop())}</label>
                                                    <div className="col-md-2">                                                                                        
                                                        <input
                                                        type="text"
                                                        name={ageId}
                                                        data-id={idx}
                                                        id={ageId}
                                                        value={dados10[idx].contrato} 
                                                        className="contrato"
                                                        onChange={this.handleChange10}
                                                        />                                                    
                                                    </div>
                                                    
                                                    <div className="col-md-6">                                               
                                                            <input
                                                            type="text"
                                                            name={catId}
                                                            data-id={idx}
                                                            id={catId}
                                                            value={dados10[idx].paciente} 
                                                            className="paciente"
                                                            onChange={this.handleChange10}                                                      
                                                            />                                                  
                                                    </div>
                                                    
                                                    <div className="col-md-2">                                                
                                                        <button type="submit"  className="btn btn-success" onClick={this.handleSubmit10} data-id={idx} style={{backgroundColor: '#2E8B57', color: '#f0f0f0',marginLeft: 70+'%'}}> Salvar </button>                                              
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                        })  
                                    }                 
                            </ul>                       
                        </div>
                    </div> 
                }                
            }

            // CONTROLE DE PLANTÃO MÉDICO CONSULTORIO HORA ENTRADA E HORA SAÍDA

                if (this.state.horaEntrada !== "") {
                    mostraSaida = <div>
                        <label>Hora Saída</label>                    
                        <input type="time" className="form-control" value={this.state.horaSaida} onChange={this.handleHoraSaida} />
                    </div> 
                }

               
                if (this.state.medicosPlantaoId !== "") {
                    mostraBotao = <button type="submit" className="btn btn-success" onClick={this.editarPlantao}> Editar  </button>
                }

                if (this.state.medicosPlantaoId === "" && this.state.consultorio !== "") {
                    mostraBotao = <button type="submit" className="btn btn-success" onClick={this.handleSubmitMedico} > Salvar </button>                                              
                }
            }
            
            return (
                <div>
                    <h2>Dados da agenda</h2>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="unidade"> Unidade </label>
                                <select 
                                    className="form-control" 
                                    id="unidade" 
                                    name="unidade"
                                    value={this.state.unidade}                                    
                                    onChange={this.handlerUnidade} >                                                                            
                                    <option value="" > ---Selecione a unidade --- </option>
                                    <option value="CAXIAS">CAXIAS</option>  
                                    <option value="NILÓPOLIS">NILÓPOLIS</option> 
                                    <option value="NOVA IGUAÇU"> NOVA IGUAÇU </option>
                                    <option value="QUEIMADOS"> QUEIMADOS </option>
                                    <option value="RIO DE JANEIRO"> RIO DE JANEIRO </option>
                                    <option value="VILAR">VILAR</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="especialidade"> Especialidade </label>
                                <select 
                                    className="form-control" 
                                    id="especialidade" 
                                    name="especialidade"
                                    value={this.state.especialidade}                                    
                                    onChange={this.handlerEspecialidade} >                                                                            
                                    <option value="1" > ---Selecione a especialidade --- </option>
                                    {listaEspecialidades}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="medico"> Médico </label>
                                <select 
                                    className="form-control" 
                                    id="medico" 
                                    name="medico"
                                    value={this.state.medico}                                    
                                    onChange={this.handlerMedico} >                                                                            
                                    <option value="" > --- Selecione o(a) médico(a) --- </option>
                                    {listaMedicos}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-group">
                                <label htmlFor="dataAgendamento"> Data Agendamento </label>
                                <input 
                                type="date" 
                                className="form-control" 
                                id="dataAgendamento" 
                                value={this.state.dataAgendamento} 
                                onChange={this.handlerDataAgendamento} 
                                name="dataAgendamento" />
                            </div> 
                        </div>
                    </div>  
                    <div className="row">
                        <div className="col-md-2">
                            <div className="form-group">
                                <label htmlFor="consultorio"> Consultório </label>
                                <select 
                                    className="form-control" 
                                    id="consultorio" 
                                    name="consultorio"
                                    value={this.state.consultorio}                                    
                                    onChange={this.handlerConsultorio} >                                                                            
                                    <option value="" > ---Selecione o consultório --- </option>
                                    <option value="1"> 1 </option>  
                                    <option value="2"> 2 </option> 
                                    <option value="3"> 3 </option>
                                    <option value="4"> 4 </option>
                                    <option value="5"> 5 </option>
                                    <option value="6"> 6 </option>
                                    <option value="7"> 7 </option>
                                    <option value="8"> 8 </option>
                                    <option value="9"> 9 </option>
                                    <option value="10"> 10 </option>
                                    <option value="11"> 11 </option>
                                    <option value="12"> 12 </option>
                                    <option value="13"> 13 </option>
                                    <option value="14"> 14 </option>
                                    <option value="15"> 15 </option>
                                    <option value="16"> 16 </option>
                                    <option value="17"> 17 </option>
                                    <option value="18"> 18 </option>
                                </select>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="form-group">  
                            <label>Hora de entrada</label>                                                                                             
                                <input type="time" className="form-control" value={this.state.horaEntrada} onChange={this.handleHoraEntrada} />                                        
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="form-group">                                                                                               
                            {mostraSaida}
                            </div>
                        </div>
                        
                        <div className="col-md-2"  style={{paddingTop: 40+'px'}}>
                            {mostraBotao}
                        </div>
                    </div>
                    <form>
                         
                        {montaHeader} {montaHeader2} {montaHeader3} {montaHeader4} {montaHeader5} 
                        {montaHeader6} {montaHeader7} {montaHeader8} {montaHeader9} {montaHeader10}
                        
                    </form>                
                </div>
            )
    
        }
    }