import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { customHistory } from '../..';

const sleep = () => new Promise(resolve => setTimeout(resolve, 300))

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  async(response) => {
    await sleep()
    return response;
  },
  (err: AxiosError) => {
    const { data, status } = err.response!;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateError: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateError.push(data.errors[key]);
            }
          }
          throw modelStateError.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 500:
        customHistory.push('/server-error', { err: data });
        break;
      default:
        break;
    }
    return Promise.reject(err.response);
  }
);

const requset = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: () => requset.get('products'),
  details: (id: number) => requset.get(`products/${id}`),
};

const TestErrors = {
  get400Error: () => requset.get('buggy/bad-request'),
  get401Error: () => requset.get('buggy/unauthorized'),
  get404Error: () => requset.get('buggy/not-found'),
  get500Error: () => requset.get('buggy/server-error'),
  getValidationError: () => requset.get('buggy/validation-error'),
};

const agent = {
  Catalog,
  TestErrors,
};

export default agent;
