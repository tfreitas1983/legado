import http from "../http-common"

class MedicoDataService {
    buscarTodos() {
        return http.get("/medicos")
    }

    buscarUm(id) {
        return http.get(`/medicos/${id}`)
    }

    cadastrar(data) {
        return http.post("/medicos", data)
    }

    editar(id, data) {
        return http.put(`/medicos/${id}`, data)
    }
}

export default new MedicoDataService()