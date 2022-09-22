import axios from "axios";
import { Environment } from "../../../environment";
import { errorInterceptor, responseInterceptor } from "./interceptors";

const Api = axios.create({
    baseURL: Environment.URL_BASE
})

Api.interceptors.response.use(
    (response) => responseInterceptor(response), // response quando não acontece nenhum erro e dá sucesso
    (error) => errorInterceptor(error) // qunado acontece um erro no backend
);

export {Api}