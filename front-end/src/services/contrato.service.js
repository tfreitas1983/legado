import http from "../http-common"

class ContratoDataService {
    buscarTodos() {
        return http.get("/contratos")
    }

    buscarUm(id) {
        return http.get(`/contratos/${id}`)
    }

    buscarNome(nome, page) {
        return http.get(`/chamados?nome=${nome}&page=${page}`)
    }

    buscarChamado(num, page) {
        return http.get(`/chamados?numchamado=${num}&page=${page}`)
    }

    buscarData(dt, page) {
        return http.get(`/chamados?dt_abertura=${dt}&page=${page}`)
    }

    buscarPeriodo(dt, dt_fim, page) {
        return http.get(`/chamados?dt_abertura=${dt}&dt_abertura_fim=${dt_fim}&page=${page}`)
    }

    buscarArea(area, page) {
        return http.get(`/chamados?area=${area}&page=${page}`)
    }

    buscarUnidade(unidade, page) {
        return http.get(`/chamados?unidade=${unidade}&page=${page}`)
    }

    buscarStatus(status, page) {
        return http.get(`/chamados?status=${status}&page=${page}`)
    }
}

export default new ContratoDataService()