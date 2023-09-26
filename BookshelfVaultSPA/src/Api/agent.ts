import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL = "https://localhost:7267/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    console.log("caught by interceptor");
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
};

const Catalog = {
  books: () => requests.get("Books"),
  categories: () => requests.get("Categories"),
};

const Cart = {
  get: () => requests.get("Cart"),
  addItem: (bookId: string, quantity = 1) =>
    requests.post(`Cart?bookId=${bookId}&quantity=${quantity}`, {}),
};
const agent = {
  Catalog,
  Cart,
};

export default agent;
