import http from "../http-common"

class HorarioDataService {
    buscarTodos() {
        return http.get("/horarios")
    }

    buscarUm(id) {
        return http.get(`/horarios/${id}`)
    }

    cadastrar(data) {
        return http.post("/horarios", data)
    }

    editar(id, data) {
        return http.put(`/horarios/${id}`, data)
    }
}

export default new HorarioDataService()