import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

//work in the server use: https://sporty-xkp8.onrender.com/api, work local use:Dirección IPv4 entrando a
// terminal usando el comando ipconfig
// const baseURL = 'https://sporty-xkp8.onrender.com/api'
const baseURL = 'http://192.168.0.14:8080/api'

const reservasApi = axios.create({baseURL});

reservasApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if( token ) {
            config.headers['x-token'] = token;
        }
        return config
    }
);

export default reservasApi;