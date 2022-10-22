import axiosInstance from "../utils/axios"

const ClasseService = {
  getAll: async () => {
    let response = await axiosInstance.get('/classes')
    return response.data
  },
  getById: async (id) => {
    if (!id) return

    let response = await axiosInstance.get(`/classes/${id}`)
    return response.data
  },
  create: async (classe) => {
    if (!classe) return

    let response = await axiosInstance.post(`/classes`, { class: classe })
    return response.data
  },
  destroy: async (id) => {
    if (!id) return

    let response = await axiosInstance.delete(`/classes/${id}`)
    return response.data
  },
  update: async(id, classe) => {
    if (!id && !classe) return

    let response = await axiosInstance.put(`/classes/${id}`, { class: classe })
    return response.data
  }

}

export default ClasseService