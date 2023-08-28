import axios from "axios";

const baseURL = 'http://192.168.50.70:8080/api'

const reservasApi = axios.create({baseURL});

export default reservasApi;