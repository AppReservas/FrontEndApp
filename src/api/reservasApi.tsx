import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = 'http://192.168.50.70:8080/api'

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