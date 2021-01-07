import React, { Component } from "react";
import ContratoDataService from '../services/contrato.service'
import moment from 'moment'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {FaRegCopy} from 'react-icons/fa'
//import UserService from "../services/user.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.onHandlerContrato = this.onHandlerContrato.bind(this)
    this.pegaContratos = this.pegaContratos.bind(this)
    this.mostrarContrato = this.mostrarContrato.bind(this)
    this.buscarContrato = this.buscarContrato.bind(this) 
    this.ordenar = this.ordenar.bind(this)    
    this.limpar = this.limpar.bind(this)
    this.limparMembro = this.limparMembro.bind(this)   

    this.state = {
      contratos: [],
      contrato: "",
      busca: "",
      resp: [],
      response: [],
      copiedVenda: false,
      copiedOriginal: false,
      copiedNome: false,
      copiedNasc: false,
      copiedCPF: false,
      copiedMembroNome: false,
      copiedMembroNasc: false,
      copiedMembroCPF: false
    };
  }

  componentDidMount() {
    this.pegaContratos()
    this.timerID = setInterval(      
      () => this.limparMembro(),5000
    )
  }

  onHandlerContrato (e) {
    const contrato = parseInt(e.target.value)
    this.setState({
        contrato: contrato            
    })
  }

  pegaContratos() {
    ContratoDataService.buscarTodos()
    .then(response => {
        const contratos = response.data 
        this.setState({
            contratos: contratos
        })                
    })
    .catch(e => {
        console.log(e)
    })
  }

   buscarContrato = async () => {
    this.setState({
      busca: "",
      response: [],
      resp: [],
      copiedCPF: "",
      copiedNasc: "",
      copiedNome:"",
      copiedOriginal: "",
      copiedVenda: ""
    })
    await this.state.contratos.filter((codigo)=> { 
      if (this.state.contrato === codigo.numero ) { 
        return (
            this.setState({
            busca: {
              id: codigo.id
            }
          })  
        )             
      } else {
        return false
      }
    })     
    this.mostrarContrato()
  }

  mostrarContrato = async () => {
    await ContratoDataService.buscarUm(this.state.busca.id)
    .then(response => {         
      this.setState({
        resp: response.data                    
      })    
    })    
    .catch(e => {
        console.log(e)
    }) 
    this.ordenar()       
  }

  ordenar() {
    if (this.state.resp.mensalidades && this.state.resp.mensalidades.length > 0) {
      const ordem = this.state.resp.mensalidades.reverse(function(a, b){
        return  a.dt_vencimento - b.dt_vencimento})
    
      this.setState({
        response: ordem
      })
    }
  }  

  limpar() {
    this.inputNum.value = ""
    this.setState({
      contrato: "",
      busca: "",
      response: [],
      resp: [],
      copiedCPF: "",
      copiedNasc: "",
      copiedNome:"",
      copiedOriginal: "",
      copiedVenda: ""
    })
  }

  limparMembro() {
    this.setState({
      copiedMembroNome: false,
      copiedMembroNasc: false,
      copiedMembroCPF: false
    })
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.buscarContrato()
    }
  }

  
  
  render() {
    const {resp, response, busca, contrato} = this.state


    let pessoas = null
    
    if (resp.pessoas) {
      pessoas = <div>
        <h3>Membros</h3>
        
        <div className="pessoas"> { resp.pessoas.map((pessoa, index) => {     
          if (pessoa.condicao === 2) 
          return <div className="mensalidades"  key={index}>
            <div>
            <label>{`Carteirinha: ${contrato}.0` }</label>   
            <div>
            <label>Nome: {pessoa.nome} </label>   
            <CopyToClipboard text={pessoa.nome}
                onCopy={() => this.setState({copiedNome: true})}>
                <FaRegCopy />
            </CopyToClipboard>
            {this.state.copiedNome ? <span style={{color: 'red'}}>Copiado!</span> : null}
            </div>
            <div>
              <label>Data de Nascimento: {moment(pessoa.dt_nascimento).format('DD/MM/YYYY')}</label>
              <CopyToClipboard text={moment(pessoa.dt_nascimento).format('DD/MM/YYYY')}
                onCopy={() => this.setState({copiedNasc: true})}>
                <FaRegCopy />
              </CopyToClipboard>
              {this.state.copiedNasc ? <span style={{color: 'red'}}>Copiado!</span> : null}
            </div>
            <div>
              <label>CPF: {pessoa.cpf}</label>
              <CopyToClipboard text={pessoa.cpf}
                  onCopy={() => this.setState({copiedCPF: true})}>
                  <FaRegCopy />
              </CopyToClipboard>
              {this.state.copiedCPF ? <span style={{color: 'red'}}>Copiado!</span> : null}
            </div>
            <label>RG: {pessoa.rg}</label>
            <label>Dt Inclusão: {moment(pessoa.dt_inclusao).format('DD/MM/YYYY')} </label>  
          </div>
          <div>
            <label>CEP: {pessoa.cep}</label> 
            <label>Endereço: {pessoa.endereco}</label> 
            <label>Complemento: {pessoa.complemento}</label> 
            <label>Bairro: {pessoa.bairro}</label> 
            <label>Cidade: {pessoa.cidade}</label> 
            <label>UF: {pessoa.uf}</label> 
          </div>
          <div style={{width: 30+'%'}}>
            <label>Telefone: {pessoa.telefone}</label> 
            <label>Celular: {pessoa.celular}</label> 
            <label>Celular2: {pessoa.celular2}</label> 
            <label>E-mail: {pessoa.email}</label> 
            <label>Vínculo: <b>Responsável Financeiro e Membro</b></label> 
            <div >
              <label>OBS: {pessoa.obs}</label>                
            </div>
          </div>   
          </div>
        
          if (pessoa.condicao === 0) 
          return <div className="mensalidades" key={index}>
            <div>
            <label>Nome: {pessoa.nome} </label>   
            <CopyToClipboard text={pessoa.nome}
                onCopy={() => this.setState({copiedNome: true})}>
                <FaRegCopy />
            </CopyToClipboard>
            {this.state.copiedNome ? <span style={{color: 'red'}}>Copiado!</span> : null}
            </div>
            <div>
              <label>Data de Nascimento: {moment(pessoa.dt_nascimento).format('DD/MM/YYYY')}</label>
              <CopyToClipboard text={moment(pessoa.dt_nascimento).format('DD/MM/YYYY')}
                onCopy={() => this.setState({copiedNasc: true})}>
                <FaRegCopy />
              </CopyToClipboard>
              {this.state.copiedNasc ? <span style={{color: 'red'}}>Copiado!</span> : null}
            </div>
            <div>
              <label>CPF: {pessoa.cpf}</label>
              <CopyToClipboard text={pessoa.cpf}
                  onCopy={() => this.setState({copiedCPF: true})}>
                  <FaRegCopy />
              </CopyToClipboard>
              {this.state.copiedCPF ? <span style={{color: 'red'}}>Copiado!</span> : null}
            </div>
            <label>RG: {pessoa.rg}</label>
            <label>Dt Inclusão: {moment(pessoa.dt_inclusao).format('DD/MM/YYYY')} </label>  
            <div>
              <label>CEP: {pessoa.cep}</label> 
              <label>Endereço: {pessoa.endereco}</label> 
              <label>Complemento: {pessoa.complemento}</label> 
              <label>Bairro: {pessoa.bairro}</label> 
              <label>Cidade: {pessoa.cidade}</label> 
              <label>UF: {pessoa.uf}</label> 
            </div>
            <div  style={{width: 30+'%'}}>
              <label>Telefone: {pessoa.telefone}</label> 
              <label>Celular: {pessoa.celular}</label> 
              <label>Celular2: {pessoa.celular2}</label> 
              <label>E-mail: {pessoa.email}</label>   
              <label>Vínculo: <b>Responsável Financeiro</b></label>   
              <label>OBS: {pessoa.obs}</label>            
            </div>
          </div>
          if (pessoa.condicao === 1) 
          return <div className="mensalidades" key={index}>
            <div>
              <label>Carteirinha: {pessoa.carteirinha} </label> 
              <div>
                <label>Nome: {pessoa.nome} </label>   
                <CopyToClipboard text={pessoa.nome}
                    onCopy={() => this.setState({copiedMembroNome: true})}>
                    <FaRegCopy />
                </CopyToClipboard>
                {this.state.copiedMembroNome ? <span style={{color: 'red'}}>Copiado!</span> : null}
              </div>
              <div>
                <label>Data de Nascimento: {moment(pessoa.dt_nascimento).format('DD/MM/YYYY')}</label>
                <CopyToClipboard text={moment(pessoa.dt_nascimento).format('DD/MM/YYYY')}
                    onCopy={() => this.setState({copiedMembroNasc: true})}>
                    <FaRegCopy />
                </CopyToClipboard>
                {this.state.copiedMembroNasc ? <span style={{color: 'red'}}>Copiado!</span> : null}
              </div>
              <div>
                <label>CPF: {pessoa.cpf}</label>
                <CopyToClipboard text={pessoa.cpf}
                    onCopy={() => this.setState({copiedMembroCPF: true})}>
                    <FaRegCopy />
                </CopyToClipboard>
                {this.state.copiedMembroCPF ? <span style={{color: 'red'}}>Copiado!</span> : null}
              </div>
            </div>
            <div>
              <label>Dt Inclusão: {moment(pessoa.dt_inclusao).format('DD/MM/YYYY')} </label>   
              <label>Parentesco: {pessoa.parentesco}</label>
              <label>Vínculo: <b>Somente Membro</b></label>
            </div>                           
          </div>
    })}
      </div>
      </div>
    }

    let parcelas = null
    if (response) {      
      parcelas = <div>
        <h3>Mensalidades</h3>      
        <div> { response.map((parcela, index) => {     
        if (parcela.dt_cobrador !== '0000-00-00' && parcela.status === "EM ABERTO")            
            return <div className="mensalidades" key={index}>          
            <strong>Status:<strong style={{color: 'red'}}> {parcela.status}</strong>   </strong>
            <label>{` Valor: R$ ${parcela.valor},00`}</label>      
            <label>{` Valor: R$ ${parcela.valorpago},00`}</label>        
            <strong>Dt Vencimento: {moment(parcela.dt_vencimento).format('DD/MM/YYYY')}</strong>
            <label>Data de Pagamento: {moment(parcela.dt_pagamento).format('DD/MM/YYYY')}</label>
            <label>Cobrador: {parcela.cobrador}</label>
            <label>Data Cobrador: {moment(parcela.dt_pagamento).format('DD/MM/YYYY')}</label>
            <label>Recibo: {parcela.num_recibo}</label>          
        </div> 
        if (parcela.dt_cobrador !== '0000-00-00' && parcela.status === "PAGO" )           
            return <div className="mensalidades" key={index}>          
            <strong> Status: <b>{parcela.status}</b></strong>   
            <label>{` Valor: R$ ${parcela.valor},00`}</label>      
            <label>{` Valor: R$ ${parcela.valorpago},00`}</label>        
            <strong>Dt Vencimento: {moment(parcela.dt_vencimento).format('DD/MM/YYYY')}</strong>
            <label>Data de Pagamento: {moment(parcela.dt_pagamento).format('DD/MM/YYYY')}</label>
            <label>Cobrador: {parcela.cobrador}</label>
            <label>Data Cobrador: {moment(parcela.dt_pagamento).format('DD/MM/YYYY')}</label>
            <label>Recibo: {parcela.num_recibo}</label>          
        </div>   
        if (parcela.dt_cobrador === '0000-00-00' && parcela.status === "EM ABERTO") 
            return <div className="mensalidades" key={index}>
              <strong>Status:<strong style={{color: 'red'}}> {parcela.status}</strong>   </strong>
              <label>{` Valor: R$ ${parcela.valor},00`}</label>  
              <label>{` Valor Pago: R$ ${parcela.valorpago},00`}</label>          
              <strong>Dt Vencimento: {moment(parcela.dt_vencimento).format('DD/MM/YYYY')}</strong>
              <label>Data de Pagamento: {moment(parcela.dt_pagamento).format('DD/MM/YYYY')}</label>                  
            </div> 
        if (parcela.dt_cobrador === '0000-00-00' && parcela.status === "PAGO" ) 
            return <div className="mensalidades" key={index}>
              <strong>Status: {parcela.status}</strong>   
              <label>{` Valor: R$ ${parcela.valor},00`}</label>  
              <label>{` Valor Pago: R$ ${parcela.valorpago},00`}</label>          
              <strong>Dt Vencimento: {moment(parcela.dt_vencimento).format('DD/MM/YYYY')}</strong>
              <label>Data de Pagamento: {moment(parcela.dt_pagamento).format('DD/MM/YYYY')}</label>                  
            </div>        
        })} 
        </div>
        </div> 
    }

    let dtvenda = null
    if (resp.dt_venda < '2020-07-01') {
      dtvenda = <div>
        <label>  Data da venda: {`${resp.vencimento.slice(-2)}/06/2020`} </label>
        
        <CopyToClipboard text={`${resp.vencimento.slice(-2)}/06/2020`}
          onCopy={() => this.setState({copiedVenda: true})}>
          <FaRegCopy />
          
        </CopyToClipboard>
        

      {this.state.copiedVenda ? <span style={{color: 'red'}}>Copiado!</span> : null}
    </div>
    }

    if (resp.dt_venda >= '2020-07-01') {
      dtvenda = <div>
      <label>   Data da venda: {moment(resp.vencimento).format('DD/MM/YYYY')}   </label>
      <CopyToClipboard text={moment(resp.vencimento).format('DD/MM/YYYY')}
          onCopy={() => this.setState({copiedVenda: true})}>
          <FaRegCopy />
      </CopyToClipboard>

      </div>
    }

    let mostrar = null 
    if (busca !== "" && resp.pessoas) {
    
      mostrar =  <div style={{width:92+'%'}}>        
         <div>
           <h2>Dados do Contrato</h2>
            <div className="mensalidades" > 
                <label>Contrato: {resp.numero}</label>
                <label>Unidade: {resp.unidade}</label>  
                <div>
                <label value={moment(resp.dt_venda).format('DD/MM/YYYY')}> Data original: {moment(resp.dt_venda).format('DD/MM/YYYY')}</label>
                
                <CopyToClipboard text={moment(resp.dt_venda).format('DD/MM/YYYY')}
                  onCopy={() => this.setState({copiedOriginal: true})}>
                  <FaRegCopy />
                </CopyToClipboard>
        
                {this.state.copiedOriginal ? <span style={{color: '#f2f2f2', backgroundColor: 'red', borderRadius: 5+'px'}}>Copiado!</span> : null}
                </div>              
                { dtvenda  }
                <label> Cobrador: {resp.cobrador}</label>
                <label> Vendedor: {resp.vendedor}</label>
            </div> 
            <div style={{margin: 1+'%'}}>             
                {pessoas}                     
            </div> 
            <div>           
              {parcelas}              
            </div>              
          </div>            
                 
      </div>
    }
         
   if (contrato !== "" && resp === "") {
      mostrar = <div>
        <label> <b> Contrato não encontrado! </b></label>
      </div>
    }  
   


    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: 3+'%'}}>          
          <div className="form-group" style={{display: 'flex', justifyContent: 'space-between'}}>
            <input type="number" min="1000" className="form-control" autoFocus placeholder="Digite o contrato" onChange={this.onHandlerContrato} onKeyPress={this.handleKeyPress} ref={el => this.inputNum = el} />            
            <button type="button" className="btn btn-info" onClick={this.buscarContrato}> Buscar </button>
            <button type="button" className="btn btn-danger" onClick={this.limpar}> Limpar </button>
          </div>
        </div>             
        {mostrar}  
      </div>
    )
  }
}