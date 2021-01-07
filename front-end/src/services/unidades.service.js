import http from "../http-common"

class UnidadeDataService {
    buscarTodos() {
        return http.get("/unidades")
    }

    buscarUm(id) {
        return http.get(`/unidades/${id}`)
    }

    cadastrar(data) {
        return http.post("/unidades", data)
    }

    editar(id, data) {
        return http.put(`/unidades/${id}`, data)
    }
}

export default new UnidadeDataService()