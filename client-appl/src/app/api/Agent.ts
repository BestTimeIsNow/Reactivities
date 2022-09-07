import Axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

Axios.interceptors.response.use((response) => {
    return sleep(1000)
        .then(() => response)
        .catch((error) => console.log(error))
})


Axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => Axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => Axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => Axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => Axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => request.get<Activity[]>('Activities'),
    detail: (id: string) => request.get <Activity>(`Activities/${id}`),
    create: (body: Activity) => request.post<void>('Activities', body),
    edit: (id: string, body: Activity) => request.put<void>(`Activities/${id}`, body),
    delete: (id: string) => request.del<void>(`Activities/${id}`)
}

const agent = {
    Activities
}

export default agent;