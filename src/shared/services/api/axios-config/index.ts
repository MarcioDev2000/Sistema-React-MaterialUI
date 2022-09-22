import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
    baseURL: 'http://localhost:3333'
})

Api.interceptors.response.use(
    (response) => responseInterceptor(response), // response quando não acontece nenhum erro e dá sucesso
    (error) => errorInterceptor(error) // qunado acontece um erro no backend
);

export {Api}