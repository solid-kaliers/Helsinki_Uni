import axios from "axios";
const baseUrl = "http://localhost:3001/persons"

const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request
            .then(res => res.data)
            .catch(err => alert("Error getting all data"))
}

const createContact = (payload) => {
    const request = axios.post(baseUrl, payload)
    return request
            .then(res => res.data)
            .catch(err => alert("Error posting data"))
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
            .then(res => res.data)
            .catch(err => alert("Failed deleting"))

}

const changeContact = (id, payload) => {
    const request = axios.put(`${baseUrl}/${id}`, payload)
    return request
            .then(res => res.data)
            .catch(err => alert("Failed deleting"))

}

export default {getAllContacts, createContact, deleteContact, changeContact}