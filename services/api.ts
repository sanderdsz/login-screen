import axios from "axios";

export function setupAPI() {

  const api = axios.create({
    //baseURL: 'http://localhost:8080'
    baseURL: 'http://129.148.38.76:8080'
  })

  return api

}
