import axios from 'axios'

const baseAxios = axios.create({
  baseURL: 'https://localhost:44331/', //YOUR_API_URL HERE
  headers: {
    'Content-Type': 'application/json',
  },
})

const todoEndpointUrl = 'v1/todoitems'

export async function addNewTodoItem(item){
  return baseAxios.post(todoEndpointUrl, item)
}

export async function updateTodoItem(id, item) {
  return baseAxios.put(`${todoEndpointUrl}/${id}`, item)
}

export async function getTodoItem(id){
  return baseAxios.get(`${todoEndpointUrl}/${id}`)
}

export async function getTodoList(){
  return baseAxios.get(todoEndpointUrl)
}
