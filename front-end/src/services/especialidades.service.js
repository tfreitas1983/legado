import http from "../http-common"

class EspecialidadeDataService {
    buscarTodos() {
        return http.get("/especialidades")
    }

    buscarUm(id) {
        return http.get(`/especialidades/${id}`)
    }

    cadastrar(data) {
        return http.post("/especialidades", data)
    }

    editar(id, data) {
        return http.put(`/especialidades/${id}`, data)
    }
}

export default new EspecialidadeDataService()