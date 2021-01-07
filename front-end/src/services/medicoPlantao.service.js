import http from "../http-common"

class MedicoPlantaoDataService {
    buscarTodos() {
        return http.get("/medicosplantao")
    }

    buscarUm(id) {
        return http.get(`/medicosplantao/${id}`)
    }

    cadastrar(data) {
        return http.post("/medicosplantao", data)
    }

    editar(id, data) {
        return http.put(`/medicosplantao/${id}`, data)
    }
}

export default new MedicoPlantaoDataService()