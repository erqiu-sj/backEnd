import Axios, {AxiosRequestConfig} from 'axios'

const AdminHttp = Axios.create({
    baseURL: 'http://localhost:8080/adminColumnDeletion',
    timeout: 4000
})


const usrHttp = Axios.create({
    baseURL: "http://localhost:8080/specialColumn",
    timeout: 4000
})

export function AdminColumn(config: AxiosRequestConfig) {
    return AdminHttp(config)
}


export function UsrColumn(config: AxiosRequestConfig) {
    return usrHttp(config)
}