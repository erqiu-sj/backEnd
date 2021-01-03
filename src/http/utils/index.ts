import Axios, {AxiosRequestConfig} from "axios";

const Http = Axios.create({
    baseURL: "http://localhost:8080/utils",
    timeout: 4000
})

export function HttpUtilsRouter(config: AxiosRequestConfig) {
    return Http(config)
}