import http from "../http-common"

class AtendimentoDataService {
    buscarTodos() {
        return http.get("/atendimentos")
    }

    buscarUm(id) {
        return http.get(`/atendimentos/${id}`)
    }

    cadastrar(data) {
        return http.post("/atendimentos", data)
    }

    editar(id, data) {
        return http.put(`/atendimentos/${id}`, data)
    }
}

export default new AtendimentoDataService()