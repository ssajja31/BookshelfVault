import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../Reducers/configureStore";

axios.defaults.baseURL = "https://localhost:7267/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

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
  booksByCategoryId: (categoryId: number) =>
    requests.get(`Books/GetBooksByCategory/${categoryId}`),
};

const Cart = {
  get: () => requests.get("Cart"),
  addItem: (bookId: string, quantity = 1) =>
    requests.post(`Cart?bookId=${bookId}&quantity=${quantity}`, {}),
};

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
};

const agent = {
  Catalog,
  Cart,
  Account,
};

export default agent;
