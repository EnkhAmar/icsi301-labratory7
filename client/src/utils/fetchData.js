import axios from 'axios'

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.put(`/api/${url}`, post, {
        headers: { Authorization: token }
    })
    return res
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.put(`/api/${url}`, {
        headers: { Authorization: token }
    })
    return res
}