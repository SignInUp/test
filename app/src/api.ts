import axios from 'axios'

const API = 'http://localhost:3010'

export const api = {
    fetchEmployeesById: async (id: number) => {
        const response = await axios.get(`${API}/employee/${id}`)
        return response.data
    },
    fetchEmployees: async (skip: number, count: number) => {
        const response = await axios.get(`${API}/employee?skip=${skip}&count=${count}`)
        return response.data
    },
    deleteEmployees: (ids: Array<number>) => {
        axios.delete(`${API}/employee?ids=${ids}`)
    }
}