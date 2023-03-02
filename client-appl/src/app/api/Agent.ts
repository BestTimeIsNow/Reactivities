import Axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { Activity } from '../models/activity';
import { router } from '../routes/Router';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}


Axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response
}, (error:any) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            toast.error('Bad Request');
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 403:
            toast.error('forbidden');
            break;
        case 404:
            router.navigate('/not-found');
            break;
        case 500:
            toast.error('server-error')
            break;
    }
    return Promise.reject(error);
});



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