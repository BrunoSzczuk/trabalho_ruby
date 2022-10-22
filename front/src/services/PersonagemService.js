import axiosInstance from "../utils/axios"

const PersonagemService = {
  getAll: async () => {
    let response = await axiosInstance.get('/personagems')
    return response.data
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/personagems/${id}`)
    return response.data
  },
  create: async (personagem) => {
    if (!personagem) return

    let response = await axiosInstance.post(`/personagems`, { personagem: personagem })
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/personagems/${id}`)
    return response.data
  },
  update: async (id, personagem) => {
    if (!id && !personagem) return

    let response = await axiosInstance.put(`/personagems/${id}`, { personagem: personagem })
    return response.data
  }

}

export default PersonagemService