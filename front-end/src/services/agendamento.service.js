import http from "../http-common"

class AgendamentoDataService {
    buscarTodos() {
        return http.get("/agendamentos")
    }

    buscarUm(id) {
        return http.get(`/agendamentos/${id}`)
    }

    cadastrar(data) {
        return http.post("/agendamentos", data)
    }

    editar(id, data) {
        return http.put(`/agendamentos/${id}`, data)
    }
}

export default new AgendamentoDataService()