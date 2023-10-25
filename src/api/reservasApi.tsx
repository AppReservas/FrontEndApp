import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = 'https://sporty-xkp8.onrender.com/api'

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